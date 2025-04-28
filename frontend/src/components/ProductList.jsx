import ProductCard from "@/components/ProductCard.jsx";

function ProductList() {
    return (
        <>
            <div
                className={"w-[93vw] grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mx-auto gap-12 place-content-center my-10"}>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </>
    );
}

export default ProductList;