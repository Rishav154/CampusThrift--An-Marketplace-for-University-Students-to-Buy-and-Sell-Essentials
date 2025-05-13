import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label.jsx";
import {useSelector} from "react-redux";
import {PuffLoader} from "react-spinners";

function Profile() {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen m-[-100px]">
                <PuffLoader color="green" size={90}/>
            </div>
        );
    }

    return (
        <Card className="p-6 bg-transparent">
            <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32">
                <div className="relative h-60 w-60 overflow-hidden rounded-full border-4 border-white shadow-xl mb-4">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <img
                            src="https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                            alt="Profile Picture"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <CardTitle className="mb-6">
                    <h1 className="text-3xl">
                        Hi{" "}
                        <span
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text hover:from-pink-600 hover:to-blue-600 transition-all duration-500">
                            {user?.name?.split(" ")[0] || "User"}
                        </span>
                    </h1>
                </CardTitle>

                <CardContent className="w-full">
                    <div className="mb-4">
                        <Label className="text-base text-gray-500">Name</Label>
                        <input
                            disabled
                            value={user?.name || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-base text-gray-500">Email</Label>
                        <input
                            disabled
                            value={user?.email || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-base text-gray-500">Course</Label>
                        <input
                            disabled
                            value={user?.course || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-base text-gray-500">University</Label>
                        <input
                            disabled
                            value={user?.university || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-base text-gray-500">Year of Graduation</Label>
                        <input
                            disabled
                            value={user?.yearOfGrad || "Not available"}
                            className="border-2 border-gray-200 rounded-2xl w-full p-3 bg-transparent"
                        />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default Profile;