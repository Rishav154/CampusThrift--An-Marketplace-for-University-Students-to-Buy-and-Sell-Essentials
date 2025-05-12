function OrderProductTile({id}) {
    return (
        <div className="flex w-full justify-between items-start sm:items-center p-3 rounded-lg bg-gray-100">
            <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <img
                        src={id?.images[0].url}
                        alt={id?.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="grid sm:gap-1 flex-grow min-w-0">
                    <h1 className="font-semibold text-sm sm:text-base capitalize truncate">{id?.name}</h1>
                    <p>
                        <span className="font-semibold">Price: <span
                            className="font-medium text-gray-500">₹{id?.price}</span></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderProductTile;