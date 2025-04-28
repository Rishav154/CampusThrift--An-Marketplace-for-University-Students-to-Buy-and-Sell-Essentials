import Login from './pages/Login.jsx'
import Hero from "./components/Hero.jsx";
import {Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup.jsx";
import TermsAndConditions from "@/pages/TermsAndConditions.jsx";
import {Toaster} from 'react-hot-toast';
import Product from "@/pages/Product.jsx";
import Checkout from "@/components/Checkout.jsx";
import Error from "./pages/Error.jsx"
import Success from "@/pages/Success.jsx";
import AdminLayout from "@/components/Layout/AdminLayout.jsx";
import CreateProduct from "@/components/CreateProduct.jsx";
import AllProducts from "@/components/AllProducts.jsx";
import Orders from "@/components/Orders.jsx";
import Settings from "@/components/Settings.jsx";
import Home from "@/pages/Home.jsx";
import Profile from "@/components/Profile.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
    return (
        <>
            <div>
                <Provider store={store}>
                    <Toaster position="top-right" reverseOrder={false}/>
                    <Routes>
                        <Route path="/" element={<Hero/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/termsandconditions" element={<TermsAndConditions/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/product" element={<Product/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path="/success" element={<Success/>}/>
                        <Route path="/profile" element={<AdminLayout children={<Profile/>}/>}/>
                        <Route path="/profile/dashboard/create-product"
                               element={<AdminLayout children={<CreateProduct/>}/>}/>
                        <Route path="/profile/dashboard/all-products"
                               element={<AdminLayout children={<AllProducts/>}/>}/>
                        <Route path="/profile/dashboard/orders" element={<AdminLayout children={<Orders/>}/>}/>
                        <Route path="/profile/dashboard/settings" element={<AdminLayout children={<Settings/>}/>}/>


                        <Route path="/*" element={<Error/>}/>
                    </Routes>
                </Provider>
            </div>
        </>
    );
}

export default App;