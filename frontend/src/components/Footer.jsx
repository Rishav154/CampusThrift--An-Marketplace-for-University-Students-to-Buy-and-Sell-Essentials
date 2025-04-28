import React from "react";
import {Button} from "@/components/ui/button";
import {FacebookIcon, Twitter, Youtube} from "lucide-react";

const Footer = () => {
    return (
        <>
            <footer className="footer-1 bg-green-200 backdrop-blur-3xl py-8 sm:py-12 mt-10">
                <div className="container mx-auto px-4">
                    <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
                        <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
                            <h5 className="text-xl font-bold mb-6 dark:text-white">Features</h5>
                            <ul className="list-none footer-links">
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Cool stuff
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Random feature
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Team feature
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Stuff for developers
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Another one
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Last time
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
                            <h5 className="text-xl font-bold mb-6 dark:text-white">Resources</h5>
                            <ul className="list-none footer-links">
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Resource
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Resource name
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Another resource
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Final resource
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                            <h5 className="text-xl font-bold mb-6 dark:text-white">About</h5>
                            <ul className="list-none footer-links">
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Team
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Locations
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Privacy
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                            <h5 className="text-xl font-bold mb-6 dark:text-white">Help</h5>
                            <ul className="list-none footer-links">
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Support
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="border-b border-solid border-transparent hover:border-customGray hover:text-customGrborder-customGray dark:hover:text-gray-300"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
                            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left dark:text-white">
                                Stay connected
                            </h5>
                            <div className="flex sm:justify-center xl:justify-start">
                                <a
                                    href=""
                                    className="w-8 h-8 rounded-full text-center py-1 text-gray-600 dark:text-gray-300"
                                >
                                    <FacebookIcon/>
                                </a>
                                <a
                                    href=""
                                    className="w-8 h-8 rounded-full text-center py-1 ml-2 text-gray-600 dark:text-gray-300"
                                >
                                    <Twitter/>
                                </a>
                                <a
                                    href=""
                                    className="w-8 h-8 rounded-full text-center py-1 ml-2 text-gray-600 dark:text-gray-300"
                                >
                                    <Youtube/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t dark:border-gray-700">
                        <div className="sm:w-full px-4 md:w-1/6">
                            <strong className="dark:text-white">FWR</strong>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                            <h6 className="font-bold mb-2 dark:text-white">Address</h6>
                            <address className="not-italic mb-4 text-sm dark:text-gray-300">
                                123 6th St.
                                <br/>
                                Melbourne, FL 32904
                            </address>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                            <h6 className="font-bold mb-2 dark:text-white">Free Resources</h6>
                            <p className="mb-4 text-sm dark:text-gray-300">
                                Use our HTML blocks for <strong>FREE</strong>.<br/>
                                <em>All are MIT License</em>
                            </p>
                        </div>
                        <div className="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
                            <Button className="px-4 py-2 dark:bg-gray-700 dark:text-white">Get Started</Button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;