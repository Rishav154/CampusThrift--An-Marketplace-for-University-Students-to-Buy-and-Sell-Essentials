import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {PuffLoader} from "react-spinners";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label.jsx";
import Navbar from "@/components/Navbar.jsx";
import {ArrowLeft} from "lucide-react";

function SellerProfile() {
    const {sellerId} = useParams();
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-seller/${sellerId}`);
                setSeller(res.data.data);
                console.log(res.data.data);
            } catch (err) {
                console.error("Error fetching seller:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSeller();
    }, [sellerId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PuffLoader/>
            </div>
        );
    }

    return (
        <>
            <Navbar showLoginButton={false}/>
            <button
                className="absolute top-20 sm:top-24 left-4 sm:left-8 md:left-16 lg:left-20 text-gray-700 hover:text-orange-400 transition-colors flex items-center gap-1"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"/>
            </button>
            <Card className="p-4 sm:p-6 bg-transparent min-h-screen">
                <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
                    <div
                        className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-60 lg:w-60 overflow-hidden rounded-full border-4 border-white shadow-xl mb-4">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img
                                src="https://avatar.iran.liara.run/public"
                                alt="Seller Avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <CardTitle className="mb-4 sm:mb-6 text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl">
                            Meet your seller{" "}
                            <span
                                className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text capitalize">
                            {seller?.fullname?.firstname || "Seller"}
                        </span>
                        </h1>
                    </CardTitle>

                    <CardContent className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">Name</Label>
                            <input
                                disabled
                                value={
                                    seller?.fullname
                                        ? `${seller.fullname.firstname} ${seller.fullname.lastname || ""}`
                                        : "Not available"
                                }
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">Joined On</Label>
                            <input
                                disabled
                                value={
                                    seller?.createdAt
                                        ? new Date(seller.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                        : "Not available"
                                }
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">Phone</Label>
                            <input
                                type={"password"}
                                disabled
                                value={"----------"}
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">Email</Label>
                            <input
                                disabled
                                value={seller?.email || "Not available"}
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">University</Label>
                            <input
                                disabled
                                value={seller?.university || "Not available"}
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent capitalize text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <Label className="text-sm sm:text-base text-gray-500">Course</Label>
                            <input
                                disabled
                                value={seller?.course || "Not available"}
                                className="border-2 border-gray-200 rounded-xl sm:rounded-2xl w-full p-2 sm:p-3 bg-transparent capitalize text-sm sm:text-base"
                            />
                        </div>
                    </CardContent>
                </div>
            </Card>
        </>
    );
}

export default SellerProfile;