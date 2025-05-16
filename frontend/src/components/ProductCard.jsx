import LinkButton from "@/components/LinkButton.jsx";

function ProductCard({
                         name = "Product Title",
                         price = 1000,
                         color = "no color",
                         image = {
                             url: "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                             id: "234jzhqj3"
                         }
                     }) {
    return (
        <div className="relative border w-fit overflow-clip z-1 hover:shadow-md rounded-2xl group">
            <div>
                <img src={image.url} alt={name} className="object-cover w-[30rem] h-[20rem]"/>
            </div>
            <div
                className="px-3 grid gap-1 py-2 absolute bg-white w-full bottom-0 translate-y-[3rem] group-hover:translate-y-0 transform transition-all ease-in-out duration-300 rounded-xl"
            >
                <h2 className="capitalize ml-1 font-semibold">{name}</h2>

                <div className="flex justify-between items-center ml-1">
                    <span className="mb-2">₹ {price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 mb-2 mr-2">Color: {color}</span>
                </div>

                <LinkButton to={`/product/${name.split(" ").join("-")}`} text="View Product"/>
            </div>
        </div>
    );
}

export default ProductCard;
