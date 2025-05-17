import {Input} from "@/components/ui/input.jsx";
import {Edit, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "@/redux/slices/productSlice.js";
import useErrorLogout from "@/hooks/use-error-logout.jsx";
import toast from "react-hot-toast";

function MyProducts() {

    const [category, setCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [shortDescription, setShortDescription] = useState("");


    const {products} = useSelector(state => state.product);
    const {handleErrorLogout} = useErrorLogout()
    const dispatch = useDispatch();

    useEffect(() => {
        const getMyProducts = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-my-products?category=${category}&search=${searchTerm}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const data = await res.data;
                dispatch(setProducts(data.data));
            } catch (err) {
                handleErrorLogout(err, "Error occurred while fetching your products");
            }
        };

        getMyProducts();
    }, [searchTerm, category, dispatch, handleErrorLogout]);

    const removeFromBlacklist = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/remove-blacklist-product/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const {message} = res.data;
            toast.success(`${message}`);

            const getMyProducts = async () => {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-my-products?category=${category}&search=${searchTerm}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const data = await res.data;
                dispatch(setProducts(data.data));
            };
            await getMyProducts();
        } catch (err) {
            handleErrorLogout(err, "Error Occured while reverting changes");
        }
    }

    const blacklistProduct = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/blacklist-product/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const {message, data} = res.data;
            toast.custom((t) => (
                <div
                    className={`bg-white px-4 sm:px-6 py-3 sm:py-4 shadow-md rounded-md flex items-center gap-2 sm:gap-4 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                    <div className="flex-1">
                        <p className="font-medium text-green-700">Success</p>
                        <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{message}</p>
                    </div>
                    <button
                        onClick={() => {
                            removeFromBlacklist(data._id);
                            toast.dismiss(t.id);
                        }}
                        className="text-xs sm:text-sm text-blue-600 font-semibold hover:underline"
                    >
                        Undo
                    </button>
                </div>
            ));

            // Refresh product list after blacklisting
            const getMyProducts = async () => {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-my-products?category=${category}&search=${searchTerm}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const data = await res.data;
                dispatch(setProducts(data.data));
            };
            await getMyProducts();
        } catch (err) {
            handleErrorLogout(err, "Error Occured while blacklisting product");
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShortDescription(product.shortDescription || "");
        setIsEditModalOpen(true);
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedProduct = {
            ...editingProduct,
            name: formData.get("name"),
            shortDescription,
            description: formData.get("description"),
            price: formData.get("price"),
            color: formData.get("color"),
            category: formData.get("category"),
        }

        dispatch(
            setProducts(
                products.map((p) => p._id === updatedProduct._id ? updatedProduct : p
                ))
        );

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-product/${editingProduct._id}`,
                {
                    name: updatedProduct.name,
                    shortDescription: updatedProduct.shortDescription,
                    description: updatedProduct.description,
                    price: updatedProduct.price,
                    color: updatedProduct.color,
                    category: updatedProduct.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });

            const {message} = res.data;
            toast.success(message);

            setIsEditModalOpen(false);
            setEditingProduct(null)
        } catch (error) {
            handleErrorLogout(error, "Error occured while updating product");
        }
    }

    return (
        <>
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 -z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">My Products</h1>

                <div className="mb-4 sm:mb-8">
                    <form className="flex flex-col gap-4 w-full">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="search">
                                Search Products
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name or description"
                                    className="pl-10 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search size={20}
                                        className="absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2"/>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="Category">
                                Category
                            </label>
                            <Select value={category} onValueChange={(value) => setCategory(value)}>
                                <SelectTrigger id="Category" className="w-full">
                                    <SelectValue placeholder="Select Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
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
                    </form>
                </div>

                {
                    products?.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">
                            You haven't posted any products yet, or none match your search criteria.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {products?.map((product) => (
                                <Card key={product._id}
                                      className="flex flex-col w-full shadow-md hover:shadow-xl transition-shadow duration-200">
                                    <div className="relative">
                                        <img
                                            src={product.image.url}
                                            alt={product.name}
                                            className="rounded-t-lg h-48 sm:h-64 w-full object-cover bg-gray-100"/>
                                        <hr className="border-t border-gray-200"/>
                                    </div>

                                    <CardContent className="flex-grow px-3 sm:px-4 pt-3 sm:pt-4">
                                        <h3 className="text-base sm:text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                                            {product.shortDescription}
                                        </p>
                                        <p className="text-base sm:text-lg font-bold">
                                            ₹{product.price.toLocaleString()}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full text-sm"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <Edit className="mr-2 h-4 w-4"/> Edit
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                !product.blacklisted
                                                    ? blacklistProduct(product._id)
                                                    : removeFromBlacklist(product._id);
                                            }}
                                            className="w-full text-xs sm:text-sm"
                                        >
                                            {!product.blacklisted
                                                ? "Blacklist Product"
                                                : "Remove from Blacklist"
                                            }
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}

                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[425px] max-w-[90vw] p-4 sm:p-6">
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 py-3 sm:py-4">
                                <div className="grid gap-2 sm:gap-4 items-center">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" defaultValue={editingProduct?.name}/>
                                </div>
                                <div className="space-y-2 sm:space-y-4 mb-3 sm:mb-5">
                                    <Label htmlFor="shortDescription" className="font-medium">
                                        Short Description
                                        <span className="text-xs text-gray-500 ml-2 sm:ml-3">
                                            {shortDescription.length}/100 characters
                                        </span>
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

                                <div className="grid gap-2 sm:gap-4 items-center">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description"
                                              defaultValue={editingProduct?.description}/>
                                </div>
                                <div className="grid gap-2 sm:gap-4 items-center">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" name="price" defaultValue={editingProduct?.price}/>
                                </div>
                                <div className="grid gap-2 sm:gap-4 items-center">
                                    <Label htmlFor="color">Color</Label>
                                    <Input id="color" name="color" defaultValue={editingProduct?.color}/>
                                </div>

                                <div className="grid gap-2 sm:gap-4 items-center">
                                    <Label htmlFor="category">Category</Label>
                                    <Select name="category" defaultValue={editingProduct?.category} required>
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
                                <DialogFooter>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default MyProducts;