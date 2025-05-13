import React from "react";
import {ArrowUp, Github, Linkedin, Mail} from "lucide-react";
import {Link} from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <footer className="bg-green-200 dark:bg-gray-900 py-12 mt-10 text-gray-700 dark:text-gray-300 relative">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Features Section */}
                <div>
                    <h5 className="text-xl font-bold mb-4">Features</h5>
                    <ul className="space-y-2">
                        <li><Link to="/profile/dashboard/create-product" className="hover:underline">Sell your
                            Item</Link></li>
                        <li><Link to="/home" className="hover:underline">Buy an Item</Link></li>
                        <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                        <li><Link to="/orders" className="hover:underline">Your Orders</Link></li>
                        <li><Link to="/profile/dashboard/all-products" className="hover:underline">Your Listings</Link>
                        </li>
                        <li><Link to="/" className="hover:underline">Campus Thrift</Link></li>
                    </ul>
                </div>

                {/* About Section */}
                <div>
                    <h5 className="text-xl font-bold mb-4">About</h5>
                    <ul className="space-y-2">
                        <li>
                            <a href="https://github.com/Rishav154" target="_blank" rel="noopener noreferrer"
                               className="hover:underline">Team</a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/TJzWPtMnzWEtgZr66" target="_blank"
                               rel="noopener noreferrer" className="hover:underline">Locations</a>
                        </li>
                        <li><Link to="/privacy-policy" className="hover:underline">Privacy</Link></li>
                        <li><Link to="/termsandconditions" className="hover:underline">Terms & Condition</Link></li>
                        <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
                        <li><Link to="/cancellation-and-refund-policy" className="hover:underline">Cancellation &
                            Refund</Link></li>
                    </ul>
                </div>

                {/* Help Section */}
                <div>
                    <h5 className="text-xl font-bold mb-4">Help</h5>
                    <ul className="space-y-2">
                        <li><a href="mailto:rishav15045@gmail.com" className="hover:underline">Contact Developers</a>
                        </li>
                        <li><a href="mailto:rishav15045@gmail.com" className="hover:underline">Help Center</a></li>
                        <li><Link to="/contactus" className="hover:underline">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h5 className="text-xl font-bold mb-4">Stay Connected</h5>
                    <div className="flex space-x-4">
                        <a href="https://github.com/Rishav154" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <Github className="hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                        <a href="https://www.linkedin.com/in/rishav-prasad154/" target="_blank"
                           rel="noopener noreferrer" title="LinkedIn">
                            <Linkedin className="hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                        <a href="mailto:rishav15045@gmail.com" title="Email">
                            <Mail className="hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                title="Back to Top"
                className="absolute right-6 bottom-6 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110"
            >
                <ArrowUp size={20}/>
            </button>
        </footer>
    );
};

export default Footer;
