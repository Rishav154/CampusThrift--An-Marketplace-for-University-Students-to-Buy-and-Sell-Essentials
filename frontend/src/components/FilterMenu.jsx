import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import axios from "axios";
import {setProducts} from "@/redux/slices/productSlice.js";
import {useDispatch} from "react-redux";

const categoryData = {
    trigger: "Category",
    items: ["Cat1", "Cat2", "Cat3"],
}

const priceData = {
    trigger: "Price",
    items: ["500", "1000", "2000", "3000", "4000", "5000"]
}


function FilterMenu() {

    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getFilterProducts = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-products?category=${category}&price=${price}&search=${search}`
            )
            const data = await res.data;
            dispatch(setProducts(data.data));
        }
        getFilterProducts()
    }, [category, price, search]);

    return (
        <>
            <div
                className={"w-[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0"}>
                {/*Dropdown Filters*/}
                <div className={"flex sm:w-[30%] w-full gap-3"}>
                    <Select onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger id={categoryData.trigger} className={"w-full"}>
                            <SelectValue placeholder={categoryData.trigger}/>
                        </SelectTrigger>
                        <SelectContent position={"popper"}>
                            {
                                categoryData.items.map((item, index) => (
                                    <SelectItem value={item} key={index} className={"capitalize"}>{item}</SelectItem>
                                ))
                            }

                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setPrice(value)}>
                        <SelectTrigger id={priceData.trigger} className={"w-full"}>
                            <SelectValue placeholder={priceData.trigger}/>
                        </SelectTrigger>
                        <SelectContent position={"popper"}>
                            {
                                priceData.items.map((item) => (
                                    <SelectItem value={item} key={item} className={"capitalize"}>Less
                                        than {item}</SelectItem>
                                ))
                            }

                        </SelectContent>
                    </Select>
                </div>

                {/*Search Input*/}
                <div className={"sm:w-[60%] w-full"}>
                    <Input id={"search"} placeholder={"Search Here..."} onChange={(e) => {
                        setSearch(e.target.value)
                    }}/>
                </div>

            </div>
        </>
    );
}

export default FilterMenu;