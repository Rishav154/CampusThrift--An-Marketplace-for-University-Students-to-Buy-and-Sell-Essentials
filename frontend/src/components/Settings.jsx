import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";

export default function AccountSettings() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [isLoading, setIsLoading] = useState({password: false, phone: false});

    const API_BASE_URL = import.meta.env.VITE_API_URL || "";

    const handlePasswordChange = async () => {
        if (!emailOrPhone || !previousPassword || !newPassword) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(prev => ({...prev, password: true}));

        try {
            const response = await axios({
                method: "PUT",
                url: `${API_BASE_URL}/change-password`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    emailOrPhone,
                    previousPassword,
                    newPassword
                },
                withCredentials: true
            });

            const {data} = response;

            if (data.success) {
                toast.success(data.message || "Password changed successfully");
                setPreviousPassword("");
                setNewPassword("");
                setEmailOrPhone("");
            } else {
                toast.error(data.message || "Failed to change password");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(`Error: ${errorMessage}`);
            console.error("Password change error:", error);
        } finally {
            setIsLoading(prev => ({...prev, password: false}));
        }
    };

    const handlePhoneChange = async () => {
        if (!email || !password || !newPhone) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (isNaN(Number(newPhone))) {
            toast.error("Phone number must contain only digits");
            return;
        }

        setIsLoading(prev => ({...prev, phone: true}));

        try {
            const response = await axios({
                method: "PUT",
                url: `${API_BASE_URL}/change-phone`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    email,
                    password,
                    newPhone
                },
                withCredentials: true
            });

            const {data} = response;

            if (data.success) {
                toast.success(data.message || "Phone number updated successfully");
                setEmail("");
                setPassword("");
                setNewPhone("");
            } else {
                toast.error(data.message || "Failed to update phone number");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(`Error: ${errorMessage}`);
            console.error("Phone change error:", error);
        } finally {
            setIsLoading(prev => ({...prev, phone: false}));
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto p-6 bg-white">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h1>
                <p className="text-gray-600 mb-8">Update your account information below.</p>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Password Change Section */}
                    <Card className="flex-1 border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-medium mb-4 text-gray-800">Change Password</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email or Phone
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter email or phone"
                                        value={emailOrPhone}
                                        onChange={e => setEmailOrPhone(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Previous Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="Enter previous password"
                                        value={previousPassword}
                                        onChange={e => setPreviousPassword(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <Button
                                    onClick={handlePasswordChange}
                                    className="w-full text-white"
                                    disabled={isLoading.password}
                                >
                                    {isLoading.password ? "Processing..." : "Change Password"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Phone Change Section */}
                    <Card className="flex-1 border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-medium mb-4 text-gray-800">Change Phone Number</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="Enter new phone number"
                                        value={newPhone}
                                        onChange={e => setNewPhone(e.target.value)}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <Button
                                    onClick={handlePhoneChange}
                                    className="w-full text-white"
                                    disabled={isLoading.phone}
                                >
                                    {isLoading.phone ? "Processing..." : "Change Phone Number"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}