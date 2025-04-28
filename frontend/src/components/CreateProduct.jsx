import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Loader2, Upload, X} from "lucide-react";
import {useRef, useState} from "react";
import {Textarea} from "@/components/ui/textarea.jsx";

function CreateProduct() {

    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const removeImage = (indexToRemove) => {
        setImages(images.filter(image => image !== indexToRemove));
    }

    const handleImageUpload = (e) => {

    }

    return (
        <>
            <div className=" w-full max-w-2xl -z-10">
                <CardHeader>
                    <CardTitle className={"text-2xl"}>Add New Product</CardTitle>
                    <CardDescription>Enter the details for the new product you want to add to your
                        store.</CardDescription>
                </CardHeader>

                <form>
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
                                        <SelectItem value="cat1">Cat1</SelectItem>
                                        <SelectItem value="Cat2">Cat2</SelectItem>
                                        <SelectItem value="Cat3">Cat3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className={"space-y-2"}>
                                <Label htmlFor="images">Product Images</Label>
                                <div className={"flex flex-wrap gap-4"}>
                                    <div className={"relative"}>
                                        <img
                                            src={"https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA"}
                                            alt={`Product Image ${1}`}
                                            width={100}
                                            height={100}
                                            className={"rounded-md object-cover"}
                                        />
                                        <Button
                                            variant={"destructive"}
                                            size="icon"
                                            className={"absolute -top-2 -right-2 h-4 w-4 rounded-full"}
                                            onClick={() => {
                                                removeImage(0)
                                            }}>
                                            <X className={"h-4 w-4"}/>
                                            <span className={"sr-only"}>Remove Image</span>
                                        </Button>
                                    </div>
                                    {/*    images.length > 4 && ( */}
                                    <Button onClick={() => {
                                        fileInputRef.current.click()
                                    }} className={"w-[100px] h-[100px]"} variant={"outline"}>
                                        <Upload className={"h-6 w-6"}/>
                                        <span className={"sr-only"}>Upload Image</span>
                                    </Button>
                                    {/* ) */}
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
                        <Button type="submit" className={"w-full"} disabled={!isLoading}>
                            {isLoading && <Loader2 className={"mr-2 h-4 w-4 animate-spin"}/>}
                            {isLoading ? "Adding Product" : "Add Product"}
                        </Button>
                    </CardFooter>
                </form>

            </div>
        </>
    );
}

export default CreateProduct;