import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {PuffLoader} from "react-spinners";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label.jsx";
import Navbar from "@/components/Navbar.jsx";

function SellerProfile() {
    const {sellerId} = useParams();
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            <Card className="p-6 bg-transparent min-h-screen">
                <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32">
                    <div
                        className="relative h-60 w-60 overflow-hidden rounded-full border-4 border-white shadow-xl mb-4">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img
                                src="https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                                alt="Seller Avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <CardTitle className="mb-6">
                        <h1 className="text-3xl">
                            Meet your seller{" "}
                            <span
                                className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text capitalize">
                            {seller?.fullname?.firstname || "Seller"}
                        </span>
                        </h1>
                    </CardTitle>

                    <CardContent className="w-1/2">
                        <div className="mb-4">
                            <Label className="text-base text-gray-500">Name</Label>
                            <input
                                disabled
                                value={
                                    seller?.fullname
                                        ? `${seller.fullname.firstname} ${seller.fullname.lastname}`
                                        : "Not available"
                                }
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <Label className="text-base text-gray-500">Joined On</Label>
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
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <Label className="text-base text-gray-500">Phone</Label>
                            <input
                                type={"password"}
                                disabled
                                value={"----------"}
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <Label className="text-base text-gray-500">Email</Label>
                            <input
                                disabled
                                value={seller?.email || "Not available"}
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <Label className="text-base text-gray-500">University</Label>
                            <input
                                disabled
                                value={seller?.university || "Not available"}
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent capitalize"
                            />
                        </div>

                        <div className="mb-4">
                            <Label className="text-base text-gray-500">Course</Label>
                            <input
                                disabled
                                value={seller?.course || "Not available"}
                                className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent capitalize"
                            />
                        </div>
                    </CardContent>
                </div>
            </Card>
        </>
    );
}

export default SellerProfile;
