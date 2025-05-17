function OrderProductTile({id}) {
    return (
        <div className="flex w-full justify-between items-start p-2 sm:p-3 rounded-lg bg-gray-100">
            <div className="flex flex-row items-center gap-1 sm:gap-2 w-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                    <img
                        src={id?.images[0].url}
                        alt={id?.name}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                    />
                </div>
                <div className="grid gap-0 sm:gap-1 flex-grow min-w-0 pl-1">
                    <h1 className="font-semibold text-xs sm:text-sm md:text-base capitalize truncate">{id?.name}</h1>
                    <p className="text-xs sm:text-sm md:text-base">
                        <span className="font-semibold">Price: <span
                            className="font-medium text-gray-500">₹{id?.price}</span></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderProductTile;