import {useEffect, useState} from "react";
import LinkButton from "@/components/LinkButton.jsx";

function ProductCard({
                         name = "Product Title",
                         slug = "product-title-abc12",
                         price = 1000,
                         color = "no color",
                         image = {
                             url: "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                             id: "234jzhqj3"
                         }
                     }) {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div
            className="relative border w-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-md"
            onMouseEnter={() => !isMobile && setIsDetailsVisible(true)}
            onMouseLeave={() => !isMobile && setIsDetailsVisible(false)}
            onClick={() => isMobile && setIsDetailsVisible(!isDetailsVisible)}
        >
            <div className="aspect-square w-full">
                <img
                    src={image.url}
                    alt={name}
                    className="object-cover w-full h-full"
                />
            </div>

            {isMobile && (
                <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 text-xs">
                    {isDetailsVisible ? "Close" : "Tap for details"}
                </div>
            )}

            <div
                className={`px-3 grid gap-1 py-2 absolute bg-white w-full bottom-0 transform transition-all ease-in-out duration-300 rounded-t-xl
          ${isMobile
                    ? isDetailsVisible ? "translate-y-0" : "translate-y-[calc(100%-4rem)]"
                    : isDetailsVisible ? "translate-y-0" : "translate-y-[3rem]"
                }`}
            >
                <h2 className="capitalize ml-1 font-semibold text-sm sm:text-base truncate">{name}</h2>

                <div className="flex justify-between items-center ml-1">
                    <span className="mb-2  text-sm sm:text-base font-bold">₹ {price.toLocaleString()}</span>
                    <span className="text-xs sm:text-sm text-gray-500 mb-2 mr-2 truncate max-w-[45%]">
            Color: {color}
          </span>
                </div>

                <LinkButton to={`/product/${slug}`} text="View Product"/>
            </div>
        </div>
    );
}

export default ProductCard;