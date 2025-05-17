import ProductCard from "@/components/ProductCard.jsx";
import {useSelector} from "react-redux";
import {PuffLoader} from "react-spinners";

function ProductList() {
    const {products} = useSelector((state) => state.product);

    const isLoading = !products || products.length === 0;

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
                <PuffLoader size={60} color="#4F46E5"/>
                <p className="text-lg text-gray-600 font-medium">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 my-6 sm:my-10">
                {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
