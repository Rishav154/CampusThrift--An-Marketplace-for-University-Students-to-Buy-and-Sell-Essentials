import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label.jsx";
import {useSelector} from "react-redux";
import {PuffLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Pencil} from "lucide-react";


function Profile() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen m-[-100px]">
                <PuffLoader color="green" size={90}/>
            </div>
        );
    }

    return (
        <Card className="p-3 sm:p-6 bg-transparent">
            <div className="flex justify-end">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => navigate("/profile/dashboard/settings")}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <Pencil size={20} className="text-gray-600"/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex flex-col items-center px-2 sm:px-4 md:px-8 lg:px-16">
                <div
                    className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 overflow-hidden rounded-full border-4 border-white shadow-xl mb-4">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <img
                            src="https://avatar.iran.liara.run/public/boy"
                            alt="Profile Picture"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <CardTitle className="mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl">
                        Hi{" "}
                        <span
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text hover:from-pink-600 hover:to-blue-600 transition-all duration-500 capitalize">
                            {user?.name?.split(" ")[0] || "User"}
                        </span>
                    </h1>
                </CardTitle>

                <CardContent className="w-full p-0 sm:p-2">
                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">Name</Label>
                        <input
                            disabled
                            value={user?.name || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent capitalize text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">Joined On</Label>
                        <input
                            disabled
                            value={
                                user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    : "Not available"
                            }
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">
                            Phone
                            <span className="text-xs sm:text-sm text-gray-400 ml-1">(only visible to you)</span>
                        </Label>
                        <input
                            disabled
                            value={user?.phone || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">Email</Label>
                        <input
                            disabled
                            value={user?.email || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">Course</Label>
                        <input
                            disabled
                            value={user?.course || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent capitalize text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">University</Label>
                        <input
                            disabled
                            value={user?.university || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent capitalize text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <Label className="text-sm sm:text-base text-gray-500">
                            Year of Graduation
                            <span className="text-xs sm:text-sm text-gray-400 ml-1">(only visible to you)</span>
                        </Label>
                        <input
                            disabled
                            value={user?.yearOfGrad || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-2 sm:p-3 bg-transparent text-sm sm:text-base"
                        />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default Profile;