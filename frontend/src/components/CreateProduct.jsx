import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Upload, X} from "lucide-react";
import {useRef, useState} from "react";
import {Textarea} from "@/components/ui/textarea.jsx";
import toast from "react-hot-toast";
import {PuffLoader} from "react-spinners";
import axios from "axios";
import useErrorLogout from "@/hooks/use-error-logout.jsx";

function CreateProduct() {

    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shortDescription, setShortDescription] = useState("");
    const {handleErrorLogout} = useErrorLogout()
    const formRef = useRef(null);

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    }

    const handleImageUpload = (e) => {
        const files = e.target.files
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                preview: URL.createObjectURL(file),
                file: file
            }));
            setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
        }
    }

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
            setImages([]);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const shortDescription = e.target.shortDescription.value;
        const longDescription = e.target.description.value;
        const price = e.target.price.value;
        const color = e.target.color.value;
        const category = e.target.category.value;

        if (!name || !shortDescription || !longDescription || !price || !category || images.length === 0) {
            toast.error("Please fill all the fields");
            return;
        }

        if (
            name.trim() === "" ||
            shortDescription.trim() === "" ||
            longDescription.trim() === "" ||
            price <= 0 ||
            category.trim() === ""
        ) {
            toast.error("Fields cannot be empty");
            return;
        }

        if (images.length < 4) {
            toast.error("Please upload at least 4 images");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("shortDescription", shortDescription);
        formData.append("description", longDescription);
        formData.append("price", price);
        formData.append("color", color);
        formData.append("category", category);
        images.forEach((image) => {
            formData.append("images", image.file)
        });

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-product`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            toast.success(`Success\n${res.data.message}`);
            resetForm();
        } catch (error) {
            return handleErrorLogout(error, "Error uploading product");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            <div className="w-full max-w-5xl -z-10 mx-auto px-2">
                <CardHeader className="py-6 px-8">
                    <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">Enter the details for the new product you want to
                        add to your
                        store.</CardDescription>
                </CardHeader>

                <form onSubmit={onSubmit} ref={formRef}>
                    <div className="flex flex-col lg:flex-row lg:gap-12">
                        <CardContent className="w-full px-8 py-4">
                            <div className="space-y-4 mb-5">
                                <Label htmlFor="name" className="font-medium">Name</Label>
                                <Input id="name" name="name" placeholder="Enter Product Name" className="mt-1"
                                       required/>
                            </div>
                            <div className="space-y-4 mb-5">
                                <Label htmlFor="shortDescription" className="font-medium">
                                    Short Description
                                    <span className="text-xs text-gray-500 ml-3">{shortDescription.length}/100 characters</span>
                                </Label>
                                <Textarea
                                    rows="1"
                                    id="shortDescription"
                                    name="shortDescription"
                                    placeholder="Enter a brief description"
                                    className="mt-1 h-10 resize-none"
                                    maxLength={100}
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-4 mb-5">
                                <Label htmlFor="description" className="font-medium">Description</Label>
                                <Textarea
                                    rows="7"
                                    id="description"
                                    name="description"
                                    placeholder="Enter detailed Description"
                                    className="mt-1 h-32 resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-4 mb-5">
                                <Label htmlFor="price" className="font-medium">Price</Label>
                                <Input id="price" name="price" type="number" placeholder="0.00" step="0.01"
                                       min="0" className="mt-1" required/>
                                <p className="text-xs text-gray-500 mt-1">Enter price in INR</p>
                            </div>
                            <div className="space-y-4 mb-5">
                                <Label htmlFor="color" className="font-medium">Color</Label>
                                <Input id="color" name="color" placeholder="Color of Product" className="mt-1"
                                       required/>
                            </div>
                        </CardContent>

                        <CardContent className="w-full px-6 py-4">
                            <div className="space-y-4 mb-5">
                                <Label htmlFor="category" className="font-medium">Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Textbooks">Textbooks</SelectItem>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Clothing">Clothing</SelectItem>
                                        <SelectItem value="Stationary">Stationary</SelectItem>
                                        <SelectItem value="Sports & Fitness Gear">Sports & Fitness Gear</SelectItem>
                                        <SelectItem value="Dorm & Apartment Essentials">Dorm & Apartment
                                            Essentials</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="images" className="font-medium">Product Images</Label>
                                    <span className="text-sm text-gray-500">{images.length}/4 images</span>
                                </div>
                                <div
                                    className="flex flex-wrap gap-5 mt-2 border-2 border-dashed border-gray-200 rounded-md p-6 bg-gray-50">
                                    {images.map((image, index) => (
                                        <div className="relative group" key={index}>
                                            <img
                                                src={image?.preview}
                                                alt={`Product Image ${index + 1}`}
                                                className="w-[140px] h-[140px] object-cover rounded-md shadow-sm border border-gray-100"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="h-4 w-4"/>
                                                <span className="sr-only">Remove Image</span>
                                            </Button>
                                        </div>
                                    ))}

                                    {images.length < 4 && (
                                        <Button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-[140px] h-[140px] flex flex-col gap-2"
                                            variant="outline"
                                        >
                                            <Upload className="h-6 w-6"/>
                                            <span className="text-xs">Upload Image</span>
                                        </Button>
                                    )}

                                    {images.length === 0 && (
                                        <div className="w-full text-center py-4 text-gray-500 text-sm">
                                            No images selected yet
                                        </div>
                                    )}
                                </div>
                                <Input
                                    type="file"
                                    id="images"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    ref={fileInputRef}
                                />
                                <p className="text-sm text-gray-500 mt-2">Upload up to 4 images. Supported
                                    Formats: JPG, PNG, GIF</p>
                            </div>
                        </CardContent>
                    </div>

                    <CardFooter className="px-8 pb-6 pt-2">
                        <Button type="submit" className="w-full py-6 text-base font-medium" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <PuffLoader color="white" size={24}/>
                                    <span>Adding Product...</span>
                                </div>
                            ) : "Add Product"}
                        </Button>
                    </CardFooter>
                </form>
            </div>
        </>
    );
}

export default CreateProduct;