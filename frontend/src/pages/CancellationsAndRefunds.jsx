function CancellationsAndRefunds() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Cancellations and Refunds</h1>
            <p className="text-base text-gray-800 leading-relaxed">
                CampusThrift is a platform that connects student buyers and sellers. We do not manage product inventory
                or shipping directly. As such, all cancellations and refund policies are set and handled by individual
                sellers.
                <br/><br/>
                Cancellations may be accepted only if the seller has not yet shipped the item. Once a shipment is
                initiated,
                cancellation requests may be declined at the seller’s discretion.
                <br/><br/>
                Refunds or replacements are only applicable if:
                <ul className="list-disc list-inside my-2 ml-4">
                    <li>The product delivered is damaged or defective.</li>
                    <li>The product received is significantly different from the listing.</li>
                </ul>
                In such cases, buyers must contact the seller within 6–8 days of receiving the product, and include
                proof
                (e.g., images or description of the issue). The seller will evaluate the request and respond
                accordingly.
                <br/><br/>
                If the item includes a manufacturer warranty, users are encouraged to contact the manufacturer directly.
                <br/><br/>
                Any refund issued by the seller may take 3–5 business days to reflect, depending on the payment
                provider.
                <br/><br/>
                For platform-related issues (not specific to an order or item), you can contact us at:{" "}
                <a href="mailto:rishav15045@gmail.com" className="text-blue-600 underline">
                    rishav15045@gmail.com
                </a>
            </p>
        </div>
    );
}

export default CancellationsAndRefunds;
