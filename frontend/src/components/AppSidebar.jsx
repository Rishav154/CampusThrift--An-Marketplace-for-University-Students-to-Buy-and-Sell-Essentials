import {FilePlus2Icon, GalleryVerticalEnd, PackageSearch, Settings, User} from "lucide-react"

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
import {Link, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";

// Menu items.
const items = [
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
        title: "All Products",
        url: "/profile/dashboard/all-products",
        icon: GalleryVerticalEnd,
    },
    {
        title: "Orders",
        url: "/profile/dashboard/orders",
        icon: PackageSearch,
    },
    {
        title: "Settings",
        url: "/profile/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar({navbarHeight = "64px"}) {
    const {pathname} = useLocation()

    return (
        <Sidebar
            style={{
                "--navbar-height": navbarHeight,
                top: "var(--navbar-height)",
                height: "calc(100vh - var(--navbar-height))"
            }}
            className="z-40 "
        >
            <SidebarContent>
                <SidebarHeader>
                    <h3 className="text-xl font-bold mt-3">Dashboard</h3>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className={`${pathname === item.url && "bg-zinc-200 "}`}>
                                    <Link to={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button>Logout</Button>
            </SidebarFooter>
        </Sidebar>
    )
}