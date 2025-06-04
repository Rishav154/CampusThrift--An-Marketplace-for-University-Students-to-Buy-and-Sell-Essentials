import ProductCard from "@/components/ProductCard.jsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";

function ProductList({currentPage, setCurrentPage}) {
    const {products} = useSelector((state) => state.product);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTotalPages = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-products?page=${currentPage}&limit=20`);
                setTotalPages(res.data.pagination.totalPages);
            } catch (error) {
                console.error("Failed to fetch pagination info:", error);
            }
        };
        fetchTotalPages();
    }, [currentPage]);

    const isLoading = !products || products.length === 0;

    if (isLoading) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 my-6 sm:my-10">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="animate-pulse rounded-xl border p-4 shadow-sm space-y-4">
                            <div className="h-40 bg-gray-200 rounded-lg"/>
                            <div className="h-4 bg-gray-200 rounded w-3/4"/>
                            <div className="h-4 bg-gray-200 rounded w-1/2"/>
                        </div>
                    ))}
                </div>
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

            {totalPages > 1 && (
                <div className="my-4 flex justify-center">
                    <Pagination>
                        <PaginationContent className="flex flex-wrap justify-center gap-1">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={currentPage === index + 1 ? "bg-gray-200" : ""}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

export default ProductList;
