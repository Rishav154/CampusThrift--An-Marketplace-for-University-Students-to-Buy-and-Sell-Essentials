import React, { useState } from 'react';
import { Search, ShoppingBag, PlusCircle, LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({showLoginButton = true}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-green-200 backdrop-blur-md border-b border-green-300 border-opacity-40 text-gray-800 px-12 sticky top-0 z-50 shadow-md">
            <div className="max-w-full mx-auto flex items-center justify-between h-16">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-2">
                    <Link to="/">
                        <span className="text-lg font-bold">CampusThrift</span>
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile */}
                <div className="relative w-full max-w-xl mx-4 lg:mx-12 hidden md:flex">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 z-10" />
                    <input
                        type="search"
                        placeholder="Search for items..."
                        className="pl-8 w-full bg-white bg-opacity-30 border border-green-300 border-opacity-40 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm transition-all duration-200"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        to="/cart"
                        className="transition-all duration-500 ease-in-out bg-white hover:bg-green-500 hover:text-white backdrop-blur-sm text-green-700 font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-300/40"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Cart</span>
                    </Link>
                    <Link
                        to="/sell"
                        className="whitespace-nowrap transition-all duration-500 ease-in-out bg-green-500 hover:bg-white hover:text-black backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-400/40"
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span>Sell Item</span>
                    </Link>
                    {showLoginButton && (
                        <Link
                            to="/login"
                            className="transition-all duration-500 ease-in-out bg-white hover:bg-[#FADA7A] hover:text-black backdrop-blur-sm text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-300/40"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden py-4 bg-green-200 bg-opacity-30 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-green-300 border-opacity-40">
                    <div className="relative w-full mb-4 px-4">
                        <Search className="absolute left-6 top-3 h-4 w-4 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search for items..."
                            className="pl-8 w-full bg-white bg-opacity-30 backdrop-blur-sm border border-green-300 border-opacity-40 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                        />
                    </div>
                    <div className="flex flex-col space-y-4 px-4">
                        <Link className="transition-all duration-200 ease-in-out bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-green-700 font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-300/40" to="/cart">
                            <ShoppingBag className="h-5 w-5" />
                            <span>Cart</span>
                        </Link>
                        <Link className="transition-all duration-200 ease-in-out bg-green-500 bg-opacity-40 hover:bg-green-500 hover:bg-opacity-60 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-400/40" to="/sell">
                            <PlusCircle className="h-5 w-5" />
                            <span>Sell Item</span>
                        </Link>
                        {showLoginButton && (
                            <Link className="transition-all duration-200 ease-in-out bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center space-x-2 shadow-sm border border-green-300/40" to="/login">
                                <LogIn className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
