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
import Orders from "@/pages/Orders.jsx";
import Settings from "@/components/Settings.jsx";
import Home from "@/pages/Home.jsx";
import Profile from "@/components/Profile.jsx";
import MyOrders from "@/components/MyOrders.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";


function App() {
    return (
        <>
            <div>
                <Provider store={store}>
                    <Toaster position="top-right" reverseOrder={false}/>
                    <Routes>
                        <Route path="/" element={<Hero/>}/>

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

                        <Route path="/termsandconditions" element={<TermsAndConditions/>}/>

                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home/>
                            </ProtectedRoute>
                        }/>

                        <Route path="/product/:productName" element={<Product/>}/>

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

                        <Route path="/success" element={<Success/>}/>

                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <AdminLayout children={<Profile/>}/>
                            </ProtectedRoute>
                        }/>

                        <Route path="/profile/dashboard/create-product"
                               element={
                                   <ProtectedRoute>
                                       <AdminLayout children={<CreateProduct/>}/>
                                   </ProtectedRoute>
                               }/>

                        <Route path="/profile/dashboard/all-products"
                               element={
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
            </div>
        </>
    );
}

export default App;