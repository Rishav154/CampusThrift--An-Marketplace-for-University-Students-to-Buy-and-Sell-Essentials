import React from 'react';
import {FilePlus2Icon, GalleryVerticalEnd, Home, PackageSearch, Settings, ShoppingCart, User} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {setUserLogout} from "@/redux/slices/authSlice.js";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User,
    },
    {
        title: "Create Product",
        url: "/profile/dashboard/create-product",
        icon: FilePlus2Icon,
    },
    {
        title: "My Products",
        url: "/profile/dashboard/my-products",
        icon: GalleryVerticalEnd,
    },
    {
        title: "My Orders",
        url: "/profile/dashboard/my-orders",
        icon: ShoppingCart,
    },
    {
        title: "Customer Orders",
        url: "/profile/dashboard/orders",
        icon: PackageSearch,
    },
    {
        title: "Settings",
        url: "/profile/dashboard/settings",
        icon: Settings,
    },
]


export function AppSidebar() {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setUserLogout());
        navigate('/login');
    };

    return (
        <Sidebar

            className="z-40 transition-all duration-300"
        >
            <SidebarContent>
                <SidebarHeader>
                    <h3 className="text-xl font-bold mt-3">Dashboard</h3>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className={`${pathname === item.url && "bg-zinc-200"}`}
                                >
                                    <Link to={item.url}>
                                        <item.icon className="h-5 w-5"/>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button variant="outline" className="border-black w-full mb-2">
                    <Link to="/all-policy" className="w-full">Terms & Policies</Link>
                </Button>
                <Button onClick={handleLogout} className="w-full">Logout</Button>
            </SidebarFooter>
        </Sidebar>
    );
}