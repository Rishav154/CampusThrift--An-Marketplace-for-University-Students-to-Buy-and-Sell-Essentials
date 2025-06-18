import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import useErrorLogout from "@/hooks/use-error-logout.jsx";

function CheckoutProduct() {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const {slug} = useParams();
    const {handleErrorLogout} = useErrorLogout();

    useEffect(() => {
        const fetchProductByName = async () => {
            if (!slug) return;

            setIsLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-product-by-slug/${slug}`);
                const {data} = await res.data;
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                handleErrorLogout(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductByName();
    }, [slug]);

    useEffect(() => {
        if (window.setCheckoutProduct && !isLoading) {
            window.setCheckoutProduct(product);
        }
    }, [product, isLoading]);

    if (isLoading) {
        return (
            <div className="flex justify-between items-start p-2 sm:p-3 rounded-lg bg-gray-200">
                <div className="flex flex-row items-center gap-2 sm:gap-4 w-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-300 animate-pulse flex-shrink-0"/>
                    <div className="flex flex-col justify-center w-full overflow-hidden">
                        <div className="h-4 sm:h-5 w-full sm:w-3/4 bg-gray-300 rounded animate-pulse"/>
                        <div className="h-3 sm:h-4 w-1/2 sm:w-1/3 bg-gray-300 rounded animate-pulse mt-2"/>
                    </div>
                </div>
            </div>
        );
    }

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="flex justify-between items-start p-2 sm:p-3 rounded-lg bg-gray-200">
            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full">
                {imageError ? (
                    <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs text-gray-500">
                        No image
                    </div>
                ) : (
                    <img
                        src={product?.images?.[0]?.url}
                        alt={product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                        onError={handleImageError}
                    />
                )}
                <div className="flex flex-col justify-center overflow-hidden">
                    <h1 className="font-semibold text-xs sm:text-sm md:text-base truncate capitalize">
                        {product.name}
                    </h1>
                    <p className="text-gray-500 text-xs mt-1 sm:mt-2">
                        <span className="font-semibold">
                            Price:{" "}
                            <span className="font-medium text-gray-500">
                                ₹{product.price?.toLocaleString() || '0'}
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CheckoutProduct;