import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import axios from "axios";
import {setProducts} from "@/redux/slices/productSlice.js";
import {useDispatch} from "react-redux";

const categoryData = {
    trigger: "Category",
    items: ["All", "Textbooks", "Electronics", "Furniture", "Clothing", "Stationary", "Sports & Fitness Gear", "Dorm & Apartment Essentials"],
};

const priceData = {
    trigger: "Price",
    items: ["All", "500", "1000", "2000", "3000", "4000", "5000"]
};

function FilterMenu({currentPage, setCurrentPage}) {
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getFilterProducts = async () => {
            const params = new URLSearchParams();

            if (category && category !== "All") params.append("category", category);
            if (price && price !== "All") params.append("price", price);
            if (search) params.append("search", search);

            params.append("page", currentPage);
            params.append("limit", 20);

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-products?${params.toString()}`);
            const data = await res.data;
            dispatch(setProducts(data.data));
        };

        getFilterProducts();
    }, [category, price, search, currentPage]);

    return (
        <div className="w-[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
            <div className="flex sm:w-[30%] w-full gap-3">
                <Select onValueChange={(value) => {
                    setCategory(value);
                    setCurrentPage(1);
                }}>
                    <SelectTrigger id={categoryData.trigger} className="w-full">
                        <SelectValue placeholder={categoryData.trigger}/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {categoryData.items.map((item, index) => (
                            <SelectItem value={item} key={index} className="capitalize">{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => {
                    setPrice(value);
                    setCurrentPage(1);
                }}>
                    <SelectTrigger id={priceData.trigger} className="w-full">
                        <SelectValue placeholder={priceData.trigger}/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {priceData.items.map((item) => (
                            <SelectItem value={item} key={item} className="capitalize">
                                {item === "All" ? "All" : `Less than ${item}`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="sm:w-[60%] w-full">
                <Input
                    id="search"
                    placeholder="Search Here..."
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </div>
    );
}

export default FilterMenu;
