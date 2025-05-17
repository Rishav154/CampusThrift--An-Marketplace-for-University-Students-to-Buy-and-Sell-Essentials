import ProductCard from "@/components/ProductCard.jsx";
import {useSelector} from "react-redux";

function ProductList() {
    const {products} = useSelector((state) => state.product);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 my-6 sm:my-10">
                {products?.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;