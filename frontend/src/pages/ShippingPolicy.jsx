function ShippingPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>
            <p className="text-base text-gray-800 leading-relaxed">
                For international buyers, orders are shipped and delivered through registered international courier
                companies and/or International Speed Post only. For domestic buyers, orders are shipped through
                registered domestic courier companies and/or Speed Post only. Orders are shipped within the timeframe
                agreed at the time of order confirmation, subject to courier company/post office norms.
                <br/><br/>
                <strong>CampusThrift is a platform and does not handle delivery logistics.</strong> Delivery of the
                product is the sole responsibility of the seller. Any issues, delays, or disputes regarding shipping
                should be resolved directly with the seller.
                <br/><br/>
                CampusThrift is not liable for any delay, loss, damage, or failure in delivery caused by the courier
                company, postal authorities, or the seller.
                <br/><br/>
                Delivery confirmation will be sent to the email ID specified during registration.
                <br/><br/>
                For any platform-related support, you may contact us at:{" "}
                <a href="mailto:rishav15045@gmail.com" className="text-blue-600 underline">
                    rishav15045@gmail.com
                </a>{" "}
                or call us at <strong>9646692142</strong>.
            </p>
        </div>
    );
}

export default ShippingPolicy;
