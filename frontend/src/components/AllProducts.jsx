import {Input} from "@/components/ui/input.jsx";
import {Edit, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

function AllProducts() {
    return (
        <>
            <div className="mx-auto px-4 sm:px-8 -z-10">
                <h1 className={"text-3xl font-bold mb-8"}>Our Products</h1>

                <div className={"mb-8"}>
                    <form className={"flex gap-4 items-end sm:w-[80vw]"}>
                        <div className={"flex-1"}>
                            <label className={"block text-sm font-medium text-gray-700 mb-3"} htmlFor="search">Search
                                Products</label>
                            <div className={"relative"}>
                                <Input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name or description"
                                    className="pl-10"
                                />
                                <Search size={20}
                                        className="absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2"/>
                            </div>
                        </div>
                        <div className={"w-48"}>
                            <label className={"block text-sm font-medium text-gray-700 mb-3"}
                                   htmlFor={"Category"}>Category</label>
                            <Select>
                                <SelectTrigger id={"Category"}>
                                    <SelectValue placeholder="Select Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"all"}>All Categories</SelectItem>
                                    <SelectItem value={"cat1"}>Cat1</SelectItem>
                                    <SelectItem value={"cat2"}>Cat2</SelectItem>
                                    <SelectItem value={"cat3"}>Cat3</SelectItem>
                                    <SelectItem value={"cat4"}>Cat4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>

                </div>

                <div>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 sm:mx-0"}>
                        <Card className={"flex flex-col"}>
                            <div className={" relative"}>
                                <img
                                    src={"https://imgs.search.brave.com/J1ulDVWtqcK1D-0WDze1004K6oN5aQNYNC2u0bGNjEU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTE3/NDU3ODUvcGhvdG8v/a2V5Ym9hcmQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUEy/UTdGWUEtS2NOV0w4/VEtNMHVic2Q0TFlV/alFGSGM2RXVUUGZQ/NFRycGs9"}
                                    alt={""}
                                    className={"rounded-t-lg"}/>
                            </div>

                            <CardContent className={"flex-grow p-4"}>
                                <h3 className={"text-lg font-semibold mb-2"}>Random ass keyboard</h3>
                                <p className={"text-sm text-gray-600 mb-4"}>Lorem ipsum ding don pijsf sljdls fjslejn
                                    sfjksfj sfhs sfkjshf skjfhss sjfhkjs eso
                                    skuu sbiwoh fjfo nnoo!</p>
                                <p className={"text-lg font-bold"}>Rs.599</p>
                            </CardContent>

                            <CardFooter className={"p-4 pt-0 flex justify-between"}>
                                <Button variant={"outline"}>
                                    <Edit className={"mr-2 h-4 w-4"}/> Edit
                                </Button>
                                <Button>Blacklist Product</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <Dialog open={false}>
                    <DialogContent className={"sm:max-w-[425px]"}>
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>

                        <form>
                            <div className={"grid gap-4 py-4"}>
                                <div className={"grid gap-4 items-center"}>
                                    <Label htmlFor={"name"}>Name</Label>
                                    <Input id={"name"} name={"name"}/>
                                </div>
                                <div className={"grid gap-4 items-center"}>
                                    <Label htmlFor={"description"}>Description</Label>
                                    <Textarea id={"description"} name={"description"}/>
                                </div>
                                <div className={"grid gap-4 items-center"}>
                                    <Label htmlFor={"price"}>Price</Label>
                                    <Input id={"price"} name={"price"}/>
                                </div>
                                <div className={"grid gap-4 items-center"}>
                                    <Label htmlFor={"category"}>Category</Label>
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

export default AllProducts;