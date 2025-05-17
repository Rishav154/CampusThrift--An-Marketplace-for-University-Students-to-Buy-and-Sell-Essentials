import React from "react";
import {ArrowUp, Github, Linkedin, Mail} from "lucide-react";
import {Link} from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <footer
            className="bg-green-200 dark:bg-gray-900 py-8 sm:py-12 mt-6 sm:mt-10 text-gray-700 dark:text-gray-300 relative">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {/* Features Section */}
                <div className="col-span-1">
                    <h5 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Features</h5>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li><Link to="/profile/dashboard/create-product"
                                  className="hover:underline hover:text-green-600 transition-colors">Sell your
                            Item</Link></li>
                        <li><Link to="/home" className="hover:underline hover:text-green-600 transition-colors">Buy an
                            Item</Link></li>
                        <li><Link to="/profile"
                                  className="hover:underline hover:text-green-600 transition-colors">Profile</Link></li>
                        <li><Link to="/orders" className="hover:underline hover:text-green-600 transition-colors">Your
                            Orders</Link></li>
                        <li><Link to="/profile/dashboard/all-products"
                                  className="hover:underline hover:text-green-600 transition-colors">Your
                            Listings</Link></li>
                        <li><Link to="/" className="hover:underline hover:text-green-600 transition-colors">Campus
                            Thrift</Link></li>
                    </ul>
                </div>

                {/* About Section */}
                <div className="col-span-1">
                    <h5 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">About</h5>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>
                            <a href="https://github.com/Rishav154" target="_blank" rel="noopener noreferrer"
                               className="hover:underline hover:text-green-600 transition-colors">Team</a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/TJzWPtMnzWEtgZr66" target="_blank"
                               rel="noopener noreferrer"
                               className="hover:underline hover:text-green-600 transition-colors">Locations</a>
                        </li>
                        <li><Link to="/privacy-policy"
                                  className="hover:underline hover:text-green-600 transition-colors">Privacy</Link></li>
                        <li><Link to="/termsandconditions"
                                  className="hover:underline hover:text-green-600 transition-colors">Terms &
                            Condition</Link></li>
                        <li><Link to="/shipping-policy"
                                  className="hover:underline hover:text-green-600 transition-colors">Shipping
                            Policy</Link></li>
                        <li><Link to="/cancellation-and-refund-policy"
                                  className="hover:underline hover:text-green-600 transition-colors">Cancellation &
                            Refund</Link></li>
                    </ul>
                </div>

                {/* Help Section */}
                <div className="col-span-1 mt-6 md:mt-0">
                    <h5 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Help</h5>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li><a href="mailto:rishav15045@gmail.com"
                               className="hover:underline hover:text-green-600 transition-colors">Contact Developers</a>
                        </li>
                        <li><a href="mailto:rishav15045@gmail.com"
                               className="hover:underline hover:text-green-600 transition-colors">Help Center</a></li>
                        <li><Link to="/contact-us" className="hover:underline hover:text-green-600 transition-colors">Contact
                            Us</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="col-span-1 mt-6 md:mt-0">
                    <h5 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Stay Connected</h5>
                    <div className="flex space-x-4">
                        <a href="https://github.com/Rishav154" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <Github
                                className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                        <a href="https://www.linkedin.com/in/rishav-prasad154/" target="_blank"
                           rel="noopener noreferrer" title="LinkedIn">
                            <Linkedin
                                className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                        <a href="mailto:rishav15045@gmail.com" title="Email">
                            <Mail
                                className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-600 transition-transform hover:scale-110"/>
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
                <p>© {new Date().getFullYear()} Campus Thrift. All rights reserved.</p>
            </div>

            <button
                onClick={scrollToTop}
                title="Back to Top"
                className="fixed md:absolute right-4 bottom-4 md:right-6 md:bottom-6 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110 z-10"
            >
                <ArrowUp size={18} className="sm:w-5 sm:h-5"/>
            </button>
        </footer>
    );
};

export default Footer;