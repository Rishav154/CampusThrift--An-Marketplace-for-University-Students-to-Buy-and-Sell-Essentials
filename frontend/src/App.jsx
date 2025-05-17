import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";

import {store} from "./redux/store";

import Hero from "./components/Hero.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "@/pages/Home.jsx";
import Product from "@/pages/Product.jsx";
import Checkout from "@/components/Checkout.jsx";
import Success from "@/pages/Success.jsx";
import Error from "@/pages/Error.jsx";
import ProfileCompletion from "@/pages/ProfileCompletion.jsx";

import MyOrders from "@/components/MyOrders.jsx";
import Profile from "@/components/Profile.jsx";
import CreateProduct from "@/components/CreateProduct.jsx";
import MyProducts from "@/components/MyProducts.jsx";
import Settings from "@/components/Settings.jsx";
import AllPolicy from "@/components/AllPolicy.jsx";

import TermsAndConditions from "@/pages/TermsAndConditions.jsx";
import PrivacyTerms from "@/pages/PrivacyTerms.jsx";
import ShippingPolicy from "@/pages/ShippingPolicy.jsx";
import CancellationsAndRefunds from "@/pages/CancellationsAndRefunds.jsx";
import ContactUs from "@/pages/ContactUs.jsx";

import AdminLayout from "@/components/Layout/AdminLayout.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import {Analytics} from "@vercel/analytics/react";
import CustomerOrders from "@/pages/CustomerOrders.jsx";
import SellerProfile from "@/components/SellerProfile.jsx";
import GoogleSuccess from "@/components/GoggleSuccess.jsx";

function App() {
    return (
        <Provider store={store}>
            <Toaster position="top-right" reverseOrder={false}/>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Hero/>}/>
                <Route path="/product/:productName" element={<Product/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/termsandconditions" element={<TermsAndConditions/>}/>
                <Route path="/privacy-policy" element={<PrivacyTerms/>}/>
                <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
                <Route path="/cancellation-and-refund-policy" element={<CancellationsAndRefunds/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/all-policy" element={<AllPolicy/>}/>

                <Route path="/seller/:sellerId" element={<SellerProfile/>}/>

                <Route path="/google-success" element={<GoogleSuccess/>}/>

                <Route path="/complete-profile" element={
                    <ProtectedRoute>
                        <ProfileCompletion/>
                    </ProtectedRoute>
                }/>

                <Route path="/login" element={
                    <ProtectedRoute>
                        <Login/>
                    </ProtectedRoute>
                }/>
                <Route path="/signup" element={
                    <ProtectedRoute>
                        <Signup/>
                    </ProtectedRoute>
                }/>

                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }/>
                <Route path="/checkout/:productName" element={
                    <ProtectedRoute>
                        <Checkout/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/my-orders" element={
                    <ProtectedRoute>
                        <AdminLayout children={<MyOrders/>}/>
                    </ProtectedRoute>
                }/>

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <AdminLayout children={<Profile/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/create-product" element={
                    <ProtectedRoute>
                        <AdminLayout children={<CreateProduct/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/my-products" element={
                    <ProtectedRoute>
                        <AdminLayout children={<MyProducts/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/orders" element={
                    <ProtectedRoute>
                        <AdminLayout children={<CustomerOrders/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/settings" element={
                    <ProtectedRoute>
                        <AdminLayout children={<Settings/>}/>
                    </ProtectedRoute>
                }/>

                <Route path="/*" element={<Error/>}/>
            </Routes>
            <Analytics/>
        </Provider>
    );
}

export default App;
