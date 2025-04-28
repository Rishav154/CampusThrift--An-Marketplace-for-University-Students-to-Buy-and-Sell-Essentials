import {Button} from "@/components/ui/button.jsx";
import React from "react";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";


const imagesArray = [
    {
        url: "https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
        id: 1,
    },
    {
        url: "https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
        id: 2,
    },
    {
        url: "https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
        id: 3,
    },
    {
        url: "https://imgs.search.brave.com/jM1TJuulxmDqCUx3WDDaKLhjhG_J7LZA7MBXBceKfHg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/aWdoLWFuZ2xlLXBp/bmstYmx1ZS1rZXli/b2FyZC1kZXNrXzIz/LTIxNDk2ODAyNTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
        id: 4,
    }
]

function Product() {
    return (
        <>
            <div className="bg-orange-50 h-screen">
                <Navbar showLoginButton={false}/>
                <main
                    className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
                    {/*Left Part*/}
                    <div className="grid sm:w-[50%] gap-3">
                        <img
                            src={imagesArray[0].url}
                            alt="Product"
                            className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
                        />
                        <div className="grid grid-cols-4 gap-3">
                            {
                                imagesArray.map(({url, id}) => (
                                    <img
                                        key={id}
                                        src={url}
                                        alt="Product"
                                        className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all duration-300 ease-in-out border dark:border-none"
                                    />
                                ))
                            }
                        </div>
                    </div>
                    {/*Right Part*/}
                    <div className="sm:w-[50%] lg:w-[30%]">
                        <div className="pb-5">
                            <h2 className="font-extrabold text-2xl">CASTOR K631 PRO Wired RGB Mechanical Keyboard</h2>
                            <p className="text-sm my-2"> 65% Bluetooth + 2.4Ghz Wireless + Wired RGB Mechanical Keyboard
                                (Red Switch) adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat
                                in id cursus mi.</p>

                        </div>
                        <div className="py-5 border-t border-b">
                            <h3 className="font-bold text-3xl">Rs.560</h3>
                        </div>
                        <div className="py-5 border-b">
                            <h3 className="font-bold text-2xl">Description</h3>
                            <p className="text-base my-2">Lorem ipsum dolor sit amet consectetur adipiscing elit quisque
                                faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis
                                convallis tempus leo eu aenean sed diam.<br/> Lorem ipsum dolor sit amet consectetur
                                adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus
                                mi pretium.</p>
                        </div>
                        <div className="flex items-center my-8 gap-5">
                            <img
                                src="https://imgs.search.brave.com/nbCpeiTb2EuR438T9lxPf9scFMTWUEL3jEV0vMOjaRs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzUwLzQzLzM4/LzM2MF9GXzEwNTA0/MzM4MTBfbGZaMUdn/ZkpxS0ZOZ2VyNHJM/QzlvMnNLbktwclRp/YjIuanBn"
                                alt="Seller Profile"
                                className="w-14 h-14 rounded-full object-center object-cover border dark:border-none"
                            />
                            <div className="">
                                <h2 className="font-bold text-xl">Rishav Prasad</h2>
                                <p className="text-sm text-gray-600">Member since March 2025</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-8">
                            <Button className="rounded-lg text-base font-semibold h-12 ">Message Seller</Button>
                            <Button className="rounded-lg text-base font-semibold h-12">Seller Profile</Button>
                        </div>

                        <Button
                            className="bg-green-500 hover:bg-green-500/70 rounded-lg w-full mt-5 text-xl font-bold h-12">Buy</Button>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Product;