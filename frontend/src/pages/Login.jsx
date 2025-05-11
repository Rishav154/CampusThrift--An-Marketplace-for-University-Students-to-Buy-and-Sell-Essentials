import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Eye, EyeOff, LoaderCircle, Lock, LogIn, Mail} from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setUserLogin} from "@/redux/slices/authSlice.js";

export default function LoginForm() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailOrPhone || !password) {
            toast.error("Please fill all fields.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                emailOrPhone,
                password
            });

            toast.success("Login successful!");
            const data = await res.data;
            dispatch(setUserLogin(data))

            navigate("/home");
        } catch (err) {
            console.error("Login Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fce7c8] flex items-center justify-center px-4">
            <button
                className="absolute top-10 left-10 text-gray-700 hover:text-orange-400 transition-colors flex items-center gap-1"
                onClick={() => navigate('/')}
            >
                <ArrowLeft className="h-7 w-7"/>
            </button>
            <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-800 shadow-lg">
                <h2 className="text-orange-400 text-3xl font-bold mb-2 text-center">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Login to your Campus Thrift account
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="relative mt-4">
                        <Mail className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Lock className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full pr-10 focus:outline-none focus:border-purple-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2.5"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5"/>
                            ) : (
                                <Eye className="h-5 w-5"/>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full ${
                            loading ? 'bg-orange-300' : 'bg-orange-400'
                        } text-white font-semibold py-2 rounded-md shadow-sm hover:opacity-90 transition-all flex justify-center items-center gap-2`}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/> Logging in...
                            </>
                        ) : (
                            <>
                                <LogIn className="h-4 w-4"/> Login
                            </>
                        )}
                    </button>
                </form>

                <div className="my-4 flex items-center justify-center gap-4 text-gray-600 text-sm">
                    <span className="flex-1 border-t border-gray-700"></span>
                    OR
                    <span className="flex-1 border-t border-gray-700"></span>
                </div>

                <button
                    className="w-full flex items-center justify-center gap-3 font-semibold border border-gray-600 text-orange-400 py-2 rounded-md hover:bg-white hover:text-black transition-all">
                    <svg className="h-5 w-5" viewBox="0 0 533.5 544.3">
                        <path fill="#EA4335"
                              d="M533.5 278.4c0-18.5-1.5-36.2-4.3-53.4H272v101h147.1c-6.4 34.3-25.5 63.4-54.3 82.9v68h87.9c51.5-47.4 80.8-117.2 80.8-198.5z"/>
                        <path fill="#34A853"
                              d="M272 544.3c72.8 0 133.9-24.1 178.6-65.5l-87.9-68c-24.4 16.4-55.4 26-90.7 26-69.8 0-129-47.1-150.2-110.3H33v69.1c44.5 88.1 135.7 148.7 239 148.7z"/>
                        <path fill="#4A90E2"
                              d="M121.8 326.5c-10.6-31.3-10.6-65.5 0-96.8V160.6H33c-35 69.8-35 151.2 0 221l88.8-55.1z"/>
                        <path fill="#FBBC05"
                              d="M272 107.7c39.6 0 75.1 13.6 103 40.2l77.1-77.1C405.9 24.1 344.8 0 272 0 168.7 0 77.5 60.6 33 148.7l88.8 55.1C143 154.8 202.2 107.7 272 107.7z"/>
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-base text-gray-500">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-orange-400 underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}
