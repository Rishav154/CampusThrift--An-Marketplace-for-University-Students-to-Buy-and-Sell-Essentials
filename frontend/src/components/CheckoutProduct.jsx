function CheckoutProduct(
    name = "Keyboard",
    price = 599,
    image = {url:"https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA"}

) {
    return (
        <>
            <div className="flex justify-between items-start p-3 rounded-lg bg-gray-200">
                <div className="flex flex-row items-center gap-2">
                    <img src={image.url} alt={name} className="w-20 sm:w-28 rounded-lg" />
                    <div className="grid sm:gap-1">
                        <h1 className="font-semibold text-sm sm:text-base sm:mt-8">
                            Keyboard custom long line
                        </h1>
                        <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 text-xs sm:text-sm my-8">
                            <span className="font-semibold">
                                Price :{" "}
                                <span className="font-medium text-gray-500">Rs.{price}</span>{" "}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutProduct;