import ProductCard from "@/components/ProductCard.jsx";
import {useSelector} from "react-redux";

function ProductList() {

    const {products} = useSelector((state) => state.product);

    return (
        <>
            <div
                className={"w-[93vw] grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-12 place-content-center my-10"}>
                {
                    products?.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))
                }
            </div>
        </>
    );
}

export default ProductList;