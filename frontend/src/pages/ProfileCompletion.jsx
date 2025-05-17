import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Calendar, GraduationCap, LoaderCircle, Phone, School} from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from 'react-redux';
import {setUserLogin} from "@/redux/slices/authSlice.js";

export default function CompleteProfile() {
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [yearOfGraduation, setYearOfGraduation] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get authentication state from Redux
    const {isAuthenticated} = useSelector(state => state.auth);

    // Get token directly from localStorage
    const token = localStorage.getItem('token');

    // Check if authenticated on component mount
    useEffect(() => {
        if (!isAuthenticated || !token) {
            toast.error("Authentication required. Please login.");
            navigate('/login');
        }
    }, [isAuthenticated, token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const toastId = toast.loading("Updating your profile...");

        try {
            // Log the token being used (for debugging)
            console.log("Using token for request:", token ? `${token.substring(0, 10)}...` : 'none');

            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/complete-profile`, {
                phone,
                university,
                course,
                yearOfGrad: yearOfGraduation
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });

            toast.success("Profile updated successfully!", {id: toastId});
            const data = await res.data;
            dispatch(setUserLogin({
                ...data,
                token: localStorage.getItem('token')
            }));
            navigate('/home');
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error(err.response?.data?.message || "Failed to update profile", {id: toastId});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-customOrange flex flex-col items-center justify-center px-4 py-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-20 text-center">
                <span
                    className="bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-500 text-transparent bg-clip-text">
                    Just one
                </span>
                🤏{" "}
                <span
                    className="bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-500 text-transparent bg-clip-text">
                    last step before we proceed!
                </span>
            </h1>
            <div className="w-full max-w-md bg-white p-4 md:p-8 rounded-xl border border-gray-800 shadow-lg">
                <h2 className="text-orange-400 text-2xl md:text-3xl font-bold mb-2 text-center">Complete Your
                    Profile</h2>
                <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6 text-center">
                    Just a few more details to get you started with Campus Thrift
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Phone */}
                    <div className="relative mt-4">
                        <Phone className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            required
                        />
                    </div>

                    {/* University */}
                    <div className="relative mt-4">
                        <School className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="text"
                            placeholder="University"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            required
                        />
                    </div>

                    {/* Course */}
                    <div className="relative mt-4">
                        <GraduationCap className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full appearance-none"
                        >
                            <option value="">Select course</option>

                            <option value="btech">BTech</option>
                            <option value="bsc">BSc (Hons.)</option>
                            <option value="bca">BCA</option>
                            <option value="bcom">BCom (Hons.)</option>
                            <option value="bba">BBA</option>
                            <option value="ba-llb">BA LLB (Hons.)</option>
                            <option value="bba-llb">BBA LLB (Hons.)</option>
                            <option value="llb">LLB (Hons.)</option>
                            <option value="ba">BA (Hons.)</option>
                            <option value="bsc-agriculture">BSc Agriculture</option>
                            <option value="bsc-hotel-admin">BSc Hospitality and Hotel Administration</option>
                            <option value="bachelor-hotel-mgmt">Bachelor in Hotel Management and Catering
                                Technology
                            </option>

                            <option value="mtech">MTech</option>
                            <option value="msc">MSc</option>
                            <option value="mca">MCA</option>
                            <option value="mba">MBA</option>
                            <option value="mcom">MCom</option>
                            <option value="ma">MA (English)</option>
                            <option value="llm">LLM</option>

                            <option value="phd-cse">PhD in Computer Science & Engineering</option>
                            <option value="phd-civil">PhD in Civil Engineering</option>
                            <option value="phd-ece">PhD in Electronics & Communication Engineering</option>
                            <option value="phd-eee">PhD in Electrical & Electronics Engineering</option>
                            <option value="phd-mechanical">PhD in Mechanical Engineering</option>
                            <option value="phd-biotech">PhD in Biotechnology</option>
                            <option value="phd-chemistry">PhD in Chemistry</option>
                            <option value="phd-environmental">PhD in Environmental Science</option>
                            <option value="phd-mathematics">PhD in Mathematics</option>
                            <option value="phd-microbiology">PhD in Microbiology</option>
                            <option value="phd-physics">PhD in Physics</option>
                            <option value="phd-law">PhD in Law</option>
                            <option value="phd-management">PhD in Business/Management Studies</option>
                            <option value="phd-commerce">PhD in Commerce</option>
                            <option value="phd-english">PhD in English</option>

                        </select>
                    </div>

                    {/* Year of Graduation */}
                    <div className="relative mt-4">
                        <Calendar className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="text"
                            placeholder="Year of Graduation"
                            value={yearOfGraduation}
                            onChange={(e) => setYearOfGraduation(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full font-semibold py-2 rounded-md shadow-sm transition-all flex justify-center items-center gap-2 ${
                            !loading
                                ? 'bg-orange-400 text-white hover:opacity-90'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/> Updating Profile...
                            </>
                        ) : (
                            <>
                                Complete Profile
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}