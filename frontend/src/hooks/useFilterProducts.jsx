// src/hooks/useFilterProducts.jsx
import {useDispatch} from "react-redux";
import {setProducts} from "@/redux/slices/productSlice.js";
import axios from "axios";

export const useFilterProducts = () => {
    const dispatch = useDispatch();

    const fetchFilteredProducts = async ({category = "", price = "", search = ""}) => {
        try {
            const params = new URLSearchParams();

            if (category && category !== "All") params.append("category", category);
            if (price && price !== "All") params.append("price", price);
            if (search) params.append("search", search);

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-products?${params.toString()}`
            );

            dispatch(setProducts(res.data.data));
        } catch (error) {
            console.error("Failed to fetch filtered products:", error);
        }
    };

    return {fetchFilteredProducts};
};
