import {Link} from 'react-router-dom';

function AllPolicy() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-2xl w-full text-center p-8 bg-white rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold mb-8">Our Policies</h1>

                <ul className="list-disc list-inside space-y-6 text-left text-xl text-blue-700 mx-auto inline-block">
                    <li>
                        <Link to="/termsandconditions" className="hover:underline">
                            Terms & Conditions
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy-policy" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/cancellation-and-refund-policy" className="hover:underline">
                            Cancellation & Refund
                        </Link>
                    </li>
                    <li>
                        <Link to="/shipping-policy" className="hover:underline">
                            Shipping Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact-us" className="hover:underline">
                            Contact Us
                        </Link>
                    </li>
                </ul>

                <p className="mt-10 text-gray-600 text-lg max-w-xl mx-auto">
                    By continuing to use <span className="font-semibold">Campus Thrift</span>, you agree to all of the
                    above policies.
                </p>
            </div>
        </div>
    );
}

export default AllPolicy;
