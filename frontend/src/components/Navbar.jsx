import React, {useEffect, useState} from 'react';
import {Home, LogIn, Menu, PlusCircle, Search, User, X} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setProducts} from "@/redux/slices/productSlice.js";

function Navbar({showLoginButton = true, showProfileButton = true, showHomeButton = true}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuButton = document.getElementById('mobile-menu-button');

            if (isMenuOpen &&
                mobileMenu &&
                !mobileMenu.contains(event.target) &&
                mobileMenuButton &&
                !mobileMenuButton.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        return () => {
            setIsMenuOpen(false);
        };
    }, [navigate]);

    const handleSearch = async (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();

            if (searchQuery.trim()) {
                try {
                    const params = new URLSearchParams();
                    params.append("search", searchQuery.trim());

                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-products?${params.toString()}`);
                    const data = await res.data;

                    dispatch(setProducts(data.data));
                    setIsMenuOpen(false);
                    navigate('/home');
                } catch (error) {
                    console.error("Error searching products:", error);
                }
            }
        }
    };

    return (
        <nav
            className={`bg-green-200 backdrop-blur-md border-b border-green-300 border-opacity-40 text-gray-800 px-4 sm:px-8 md:px-12 sticky top-0 z-50 ${
                isScrolled ? 'shadow-md' : ''
            } transition-all duration-300`}>
            <div className="max-w-full mx-auto flex items-center justify-between h-16">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        <span className="text-base sm:text-lg font-bold">CampusThrift</span>
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile */}
                <div className="relative w-full max-w-xl mx-2 lg:mx-12 hidden md:flex">
                    <Search
                        className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 z-10 cursor-pointer"
                        onClick={handleSearch}
                    />
                    <input
                        type="search"
                        placeholder="Search for items..."
                        className="pl-8 w-full bg-white bg-opacity-30 border border-green-300 border-opacity-40 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm transition-all duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                    {showHomeButton && (
                        <Link
                            to="/home"
                            className="transition-all duration-500 ease-in-out bg-white hover:bg-green-500 hover:text-white backdrop-blur-sm text-gray-800 font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center space-x-1 lg:space-x-2 shadow-sm border border-green-300/40"
                        >
                            <Home className="h-4 w-4 lg:h-5 lg:w-5"/>
                            <span className="text-sm lg:text-base">Home</span>
                        </Link>
                    )}
                    <Link
                        to="/profile/dashboard/create-product"
                        className="whitespace-nowrap transition-all duration-500 ease-in-out bg-green-500 hover:bg-white hover:text-black backdrop-blur-sm text-white font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center space-x-1 lg:space-x-2 shadow-sm border border-green-400/40"
                    >
                        <PlusCircle className="h-4 w-4 lg:h-5 lg:w-5"/>
                        <span className="text-sm lg:text-base">Sell Item</span>
                    </Link>
                    {showLoginButton && (
                        <Link
                            to="/login"
                            className="transition-all duration-500 ease-in-out bg-white hover:bg-[#FADA7A] hover:text-black backdrop-blur-sm text-gray-800 font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center space-x-1 lg:space-x-2 shadow-sm border border-green-300/40"
                        >
                            <LogIn className="h-4 w-4 lg:h-5 lg:w-5"/>
                            <span className="text-sm lg:text-base">Login</span>
                        </Link>
                    )}
                    {showProfileButton && (
                        <Link
                            to="/profile"
                            className="transition-all duration-500 ease-in-out bg-white hover:bg-blue-500 hover:text-white backdrop-blur-sm text-gray-800 font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center space-x-1 lg:space-x-2 shadow-sm border border-green-300/40"
                        >
                            <User className="h-4 w-4 lg:h-5 lg:w-5"/>
                            <span className="text-sm lg:text-base">Profile</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        id="mobile-menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none bg-white bg-opacity-20 p-2 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5"/>
                        ) : (
                            <Menu className="h-5 w-5"/>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden py-4 bg-green-200 bg-opacity-90 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-green-300 border-opacity-40 absolute left-2 right-2 z-50 transition-all duration-300 ease-out"
                >
                    <div className="relative w-full mb-4 px-4">
                        <Search
                            className="absolute left-6 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                            onClick={handleSearch}
                        />
                        <input
                            type="search"
                            placeholder="Search for items..."
                            className="pl-8 w-full bg-white bg-opacity-50 backdrop-blur-sm border border-green-300 border-opacity-40 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 px-4">
                        {showHomeButton && (
                            <Link
                                className="transition-all duration-200 ease-in-out bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-50 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center space-x-3 shadow-sm border border-green-300/40"
                                to="/home"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="h-5 w-5"/>
                                <span>Home</span>
                            </Link>
                        )}
                        <Link
                            className="transition-all duration-200 ease-in-out bg-green-500 bg-opacity-70 hover:bg-green-500 hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg flex items-center space-x-3 shadow-sm border border-green-400/40"
                            to="/profile/dashboard/create-product"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <PlusCircle className="h-5 w-5"/>
                            <span>Sell Item</span>
                        </Link>
                        {showLoginButton && (
                            <Link
                                className="transition-all duration-200 ease-in-out bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-50 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center space-x-3 shadow-sm border border-green-300/40"
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn className="h-5 w-5"/>
                                <span>Login</span>
                            </Link>
                        )}
                        {showProfileButton && (
                            <Link
                                className="transition-all duration-200 ease-in-out bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-50 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center space-x-3 shadow-sm border border-green-300/40"
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-5 w-5"/>
                                <span>Profile</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;