import React from 'react';
import {Bed, Book, Boxes, Dumbbell, Laptop, PencilRuler, PlusCircle, ShirtIcon, ShoppingBag, Sofa} from "lucide-react";
import Navbar from "./Navbar.jsx";
import {Link} from "react-router-dom";

function HeroSection() {
    return (
        <div className="flex flex-col min-h-screen bg-[#fce7c8]">
            <Navbar showLoginButton={true} showHomeButton={false}/>

            <div className="flex-1 flex flex-col">
                {/* Main Hero Section */}
                <div className="py-4 px-4 md:px-12 lg:px-4 flex-grow">
                    <div className="max-w-[1500px] mx-auto text-center pt-2 md:pt-16">
                        <div className="mb-2">
                            <h2 className="shiny-text text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3">
                                Campus Thrift
                            </h2>
                            <div className="flex justify-center">
                                <span
                                    className="relative inline-block bg-transparent border-2 text-xs md:text-sm px-4 md:px-6 py-1 rounded-full font-semibold overflow-hidden group border-black">
                                  <span
                                      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_100%] animate-gradientMove opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                                  <span
                                      className="relative z-10 text-black group-hover:text-white">Student Exclusive</span>
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-4 md:mb-6">
                            Buy and Sell Directly With Other Students
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-6 md:mb-8 px-2">
                            Your campus marketplace for textbooks, tech, electronics, furniture, and more -- all from
                            fellow students at price that make sense.
                        </p>

                        {/* CTA Button */}
                        <div
                            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6 md:mt-8">
                            <div className="w-full sm:w-auto">
                                <Link to={"/home"}
                                      className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-3 md:gap-4 font-semibold bg-white hover:bg-green-500 hover:text-white text-black py-3 md:py-4 px-6 md:px-8 rounded-xl transition-colors shadow-md">
                                    <ShoppingBag className="h-4 w-4 md:h-5 md:w-5"/>
                                    Browse Listings
                                </Link>
                            </div>
                            <div className="w-full sm:w-auto">
                                <Link to={"/profile/dashboard/create-product"}
                                      className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-3 md:gap-4 font-semibold bg-green-500 hover:bg-white hover:text-black text-white py-3 md:py-4 px-6 md:px-10 rounded-xl transition-colors shadow-md">
                                    <PlusCircle className="h-4 w-4 md:h-5 md:w-5"/>
                                    List an Item
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Section - Make sure this fills the remaining space */}
                <div className="bg-[#FADA7A] px-4 md:px-12 pt-6 md:pt-8 pb-8 md:pb-12">
                    <div className="max-w-[1500px] mx-auto">
                        <h2 className="text-lg md:text-xl font-bold text-black mb-4 md:mb-6">Categories :</h2>

                        <div
                            className="font-semibold grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                            {/* Category 1 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-lg transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Book className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span className="text-xs md:text-sm text-center text-gray-600">Textbooks</span>
                                </div>
                            </Link>

                            {/* Category 2 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Laptop className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span className="text-xs md:text-sm text-center text-gray-600">Electronics</span>
                                </div>
                            </Link>

                            {/* Category 3 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Sofa className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span className="text-xs md:text-sm text-center text-gray-600">Furniture</span>
                                </div>
                            </Link>

                            {/* Category 4 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <ShirtIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span className="text-xs md:text-sm text-center text-gray-600">Clothing</span>
                                </div>
                            </Link>

                            {/* Category 5 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <PencilRuler className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span className="text-xs md:text-sm text-center text-gray-600">Stationery</span>
                                </div>
                            </Link>

                            {/* Category 6 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Dumbbell className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span
                                        className="text-xs md:text-sm text-center text-gray-600">Sports & Fitness</span>
                                </div>
                            </Link>

                            {/* Category 7 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Bed className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span
                                        className="text-xs md:text-sm text-center text-gray-600">Dorm Essentials</span>
                                </div>
                            </Link>

                            {/* Category 8 */}
                            <Link to="/home" className="block w-full">
                                <div
                                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-xl transition-shadow hover:bg-gray-50 cursor-pointer">
                                    <Boxes className="h-6 w-6 md:h-8 md:w-8 text-gray-700 mb-2 md:mb-3"/>
                                    <span
                                        className="text-xs md:text-sm text-center text-gray-600">And many more...</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;