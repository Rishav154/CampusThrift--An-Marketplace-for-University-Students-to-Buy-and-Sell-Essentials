import React from 'react';
import {Bed, Book, Boxes, Dumbbell, Laptop, PencilRuler, PlusCircle, ShirtIcon, ShoppingBag, Sofa} from "lucide-react";
import Navbar from "./Navbar.jsx";
import {Link} from "react-router-dom";

function HeroSection() {
    return (
        <div className="flex flex-col min-h-screen bg-[#fce7c8]">
            <Navbar showLoginButton={true} showHomeButton={false}/>

            {/* Hero content */}
            <div className="flex-1 flex flex-col">
                {/* Main Hero Section */}
                <div className="py-16 px-6 md:px-12 lg:px-4 flex-grow">
                    <div className="max-w-[1500px] mx-auto text-center pt-16">
                        <span
                            className="relative inline-block bg-transparent border-2 text-sm px-6 py-1 mb-1 rounded-full font-semibold overflow-hidden group border-black">
                          <span
                              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_100%] animate-gradientMove opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                          <span className="relative z-10 text-black group-hover:text-white">Student Exclusive</span>
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-6">
                            Buy and Sell Directly With Other Students
                        </h1>

                        {/* Subheading */}
                        <p className="text-2xl text-gray-500 mb-8">
                            Your campus marketplace for textbooks, tech, electronics, furniture, and more -- all from
                            fellow students at price that make sense.
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center items-center gap-8 mt-8">
                            <div>
                                <Link to={"/home"}
                                      className="whitespace-nowrap flex items-center gap-4 font-semibold bg-white hover:bg-green-500 hover:text-white text-black py-4 px-8 rounded-xl transition-colors shadow-md">
                                    <ShoppingBag className="h-5 w-5"/>
                                    Browse Listings
                                </Link>
                            </div>
                            <div>
                                <Link to={"/profile/dashboard/create-product"}
                                      className="whitespace-nowrap flex items-center gap-4 font-semibold bg-green-500 hover:bg-white hover:text-black text-white py-4 px-10 rounded-xl transition-colors shadow-md">
                                    <PlusCircle className="h-5 w-5"/>
                                    List an Item
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Section - Make sure this fills the remaining space */}
                <div className="bg-[#FADA7A] px-6 md:px-12 pt-8 pb-12">
                    <div className="max-w-[1500px] mx-auto">
                        <h2 className="text-xl font-bold text-black mb-6">Categories :</h2>

                        <div className="font-semibold grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
                            {/* Category 1 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-lg transition-shadow">
                                <Book className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Textbooks</span>
                            </div>

                            {/* Category 2 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <Laptop className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Electronics</span>
                            </div>

                            {/* Category 3 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <Sofa className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Furniture</span>
                            </div>

                            {/* Category 4 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <ShirtIcon className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Clothing</span>
                            </div>

                            {/* Category 5 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <PencilRuler className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Stationery</span>
                            </div>

                            {/* Category 6 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <Dumbbell className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Sports & Fitness Gear</span>
                            </div>

                            {/* Category 7 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <Bed className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">Dorm & Apartment Essentials</span>
                            </div>

                            {/* Category 8 */}
                            <div
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow">
                                <Boxes className="h-8 w-8 text-gray-700 mb-3"/>
                                <span className="text-sm text-gray-600">And many more...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;