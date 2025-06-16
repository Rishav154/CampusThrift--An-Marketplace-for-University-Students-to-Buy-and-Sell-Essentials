function ContactUs() {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-lg text-gray-800 text-center leading-relaxed">
                You may contact the CampusThrift support team using the information below:
                <br/><br/>
                <strong>Phone:</strong> 9646692142
                <br/>
                <strong>Email:</strong>{" "}
                <a href="mailto:rishav15045@gmail.com" className="text-blue-600 underline">
                    rishav15045@gmail.com
                </a>
            </p>
        </div>
    );
}

export default ContactUs;
