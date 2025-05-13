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
    const {handleErrorLogout} = useErrorLogout()

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

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const color = e.target.color.value;
        const category = e.target.category.value;

        if (!name || !description || !price || !category || images.length === 0) {
            toast.error("Please fill all the fields");
            return;
        }

        if (name.trim() === "" || description.trim() === "" || price <= 0 || category.trim() === "") {
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
        formData.append("description", description);
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
        } catch (error) {
            return handleErrorLogout(error, "Error uploading product");
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <>
            <div className=" w-full max-w-2xl -z-10">
                <CardHeader>
                    <CardTitle className={"text-2xl"}>Add New Product</CardTitle>
                    <CardDescription>Enter the details for the new product you want to add to your
                        store.</CardDescription>
                </CardHeader>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col lg:flex-row lg:w-[70vw]">
                        <CardContent className={"w-full"}>
                            <div className={"space-y-2"}>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder={"Enter Product Name"} required/>
                            </div>
                            <div className={"space-y-2"}>
                                <Label htmlFor="description">Description</Label>
                                <Textarea rows={4} id="description" name="description"
                                          placeholder={"Enter Product Description"}
                                          required/>
                            </div>
                            <div className={"space-y-2"}>
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" type="number" placeholder={"0.00"} step={"0.01"}
                                       min={"0"} required/>
                            </div>
                            <div className={"space-y-2"}>
                                <Label htmlFor="color">Color</Label>
                                <Input id="color" name="color" placeholder={"Color of Product"} required/>
                            </div>

                        </CardContent>
                        <CardContent className={"w-full"}>
                            <div className={"space-y-2"}>
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger>
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
                            <div className={"space-y-2"}>
                                <Label htmlFor="images">Product Images</Label>
                                <div className={"flex flex-wrap gap-4"}>
                                    {images.map((image, index) => (
                                        <div className="relative" key={index}>
                                            <img
                                                src={image?.preview}
                                                alt={`Product Image ${index + 1}`}
                                                className="w-[100px] h-[100px] object-cover rounded-md"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-4 w-4 rounded-full"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="h-4 w-4"/>
                                                <span className="sr-only">Remove Image</span>
                                            </Button>
                                        </div>
                                    ))}

                                    {images.length < 4 && (
                                        <Button type="button" onClick={() => fileInputRef.current?.click()}
                                                className={"w-[100px] h-[100px]"}
                                                variant={"outline"}
                                        >
                                            <Upload className={"h-6 w-6"}/>
                                            <span className={"sr-only"}>Upload Image</span>
                                        </Button>
                                    )}
                                </div>
                                <Input
                                    type={"file"}
                                    id={"images"}
                                    name={"images"}
                                    accept={"image/*"}
                                    multiple
                                    className={"hidden"}
                                    onChange={handleImageUpload}
                                    ref={fileInputRef}
                                />
                                <p className="text-sm text-muted-foreground mt-2">Upload up to 4 images. Supported
                                    Formats:
                                    JPG, PNG, GIF</p>

                            </div>


                        </CardContent>

                    </div>
                    <CardFooter>
                        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <PuffLoader color="white" size={30}/>
                                    Adding Product...
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