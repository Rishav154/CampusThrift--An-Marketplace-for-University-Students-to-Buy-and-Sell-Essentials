import React from 'react';
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx"
import {AppSidebar} from "@/components/AppSidebar.jsx"
import {Home} from "lucide-react";
import {Link} from "react-router-dom";

function AdminLayout({children}) {
    return (
        <div className="flex flex-col h-screen bg-customOrange">
            {/* Content area with sidebar and main content */}
            <div className="flex flex-1 relative">
                <SidebarProvider>
                    <AppSidebar/>

                    <main className="flex-1 pt-4 px-4 sm:px-6 md:px-10 transition-all duration-300 overflow-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div className="-ml-4">
                                <SidebarTrigger className="block ml-3"/>
                            </div>
                            <div>
                                <Link
                                    to="/home"
                                    className="transition-all duration-500 ease-in-out bg-white hover:bg-green-500 hover:text-white backdrop-blur-sm text-gray-800 font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center space-x-1 lg:space-x-2 shadow-sm border border-green-300/40"
                                >
                                    <Home className="h-4 w-4 lg:h-5 lg:w-5"/>
                                    <span className="text-sm lg:text-base">Home</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}

export default AdminLayout;