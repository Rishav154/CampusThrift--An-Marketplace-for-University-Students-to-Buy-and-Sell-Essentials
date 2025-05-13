import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx"
import {AppSidebar} from "@/components/AppSidebar.jsx"
import Navbar from "@/components/Navbar.jsx";

function AdminLayout({children}) {
    return (
        <div className="flex flex-col h-screen bg-customOrange">
            <Navbar showLoginButton={false}/>

            {/* Content area with sidebar and main content */}
            <div className="flex flex-1">
                <SidebarProvider>
                    <AppSidebar navbarHeight="64px"/>

                    <main className="flex-1 pt-4 px-4 sm:px-6 md:px-10 transition-all duration-300 overflow-auto">
                        <div className="mb-8 -ml-4">
                            <SidebarTrigger/>
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