import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Eye,
    EyeOff,
    GraduationCap,
    LoaderCircle,
    Lock,
    Mail,
    Phone,
    School,
    User,
} from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [yearOfGraduation, setYearOfGraduation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Creating your account...");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                firstname: firstName,
                lastname: lastName,
                email,
                phone,
                university,
                course,
                yearOfGrad: yearOfGraduation,
                password,
            });

            toast.success("Account created successfully!", {id: toastId});
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed", {id: toastId});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fce7c8] flex items-center justify-center p-4 sm:p-6">
            <button
                className="absolute top-4 left-4 sm:top-10 sm:left-10 text-gray-700 hover:text-orange-400 transition-colors flex items-center gap-1"
                onClick={() => navigate('/')}
            >
                <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7"/>
            </button>
            <div className="max-w-md w-full bg-white p-4 sm:p-8 rounded-xl border border-gray-800 shadow-lg my-6">
                <h2 className="text-orange-400 text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-center">Create an
                    account</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center">
                    Enter your information to get started with Campus Thrift
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
                        <div className="relative flex-1">
                            <User className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            />
                        </div>

                        <div className="relative flex-1">
                            <User className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <Mail className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Phone className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                        />
                    </div>

                    <div className="relative mt-4">
                        <School className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type="text"
                            placeholder="University"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mt-4">
                        <div className="relative flex-1">
                            <GraduationCap className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full appearance-none"
                            >
                                <option value="">Select course</option>
                                <option value="btech">BTech</option>
                                <option value="bca">BCA</option>
                                <option value="bba">BBA</option>
                            </select>
                        </div>

                        <div className="relative flex-1">
                            <Calendar className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                            <input
                                type="text"
                                placeholder="Year of Graduation"
                                value={yearOfGraduation}
                                onChange={(e) => setYearOfGraduation(e.target.value)}
                                className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <Lock className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 pr-10 w-full"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5">
                            {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>

                    <div className="relative mt-4">
                        <Lock className="absolute left-3 top-3.5 text-gray-600 h-4 w-4"/>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-transparent border border-gray-700 text-orange-500 text-sm rounded-md pl-10 py-2 pr-10 w-full"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2.5">
                            {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>

                    <div className="flex items-start mt-4 text-xs sm:text-sm text-gray-600">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-1 mr-2"
                        />
                        <label htmlFor="terms">
                            I agree to the <Link to="/termsandconditions" className="text-orange-400 underline">Terms
                            and Conditions</Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!acceptedTerms || loading}
                        className={`mt-6 w-full font-semibold py-2 rounded-md shadow-sm transition-all flex justify-center items-center gap-2 ${
                            acceptedTerms && !loading
                                ? 'bg-orange-400 text-white hover:opacity-90'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/> Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="my-4 flex items-center justify-center gap-4 text-gray-600 text-xs sm:text-sm">
                    <span className="flex-1 border-t border-gray-700"></span>
                    OR
                    <span className="flex-1 border-t border-gray-700"></span>
                </div>

                <button
                    onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/google`}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 font-semibold border border-gray-600 text-orange-400 py-2 rounded-md hover:bg-white hover:text-black transition-all">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 533.5 544.3">
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

                <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-500">
                    Already have an account? <Link to="/login" className="text-orange-400 underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}