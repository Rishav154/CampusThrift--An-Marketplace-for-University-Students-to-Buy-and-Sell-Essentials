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

import MyOrders from "@/components/MyOrders.jsx";
import Orders from "@/pages/Orders.jsx";
import Profile from "@/components/Profile.jsx";
import CreateProduct from "@/components/CreateProduct.jsx";
import AllProducts from "@/components/AllProducts.jsx";
import Settings from "@/components/Settings.jsx";

import TermsAndConditions from "@/pages/TermsAndConditions.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.jsx";
import ShippingPolicy from "@/pages/ShippingPolicy.jsx";
import CancellationsAndRefunds from "@/pages/CancellationsAndRefunds.jsx";
import ContactUs from "@/pages/ContactUs.jsx";

// Layout & Auth
import AdminLayout from "@/components/Layout/AdminLayout.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

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
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
                <Route path="/cancellation-and-refund-policy" element={<CancellationsAndRefunds/>}/>
                <Route path="/contactus" element={<ContactUs/>}/>

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
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <MyOrders/>
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
                <Route path="/profile/dashboard/all-products" element={
                    <ProtectedRoute>
                        <AdminLayout children={<AllProducts/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/orders" element={
                    <ProtectedRoute>
                        <AdminLayout children={<Orders/>}/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/dashboard/settings" element={
                    <ProtectedRoute>
                        <AdminLayout children={<Settings/>}/>
                    </ProtectedRoute>
                }/>

                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Provider>
    );
}

export default App;
