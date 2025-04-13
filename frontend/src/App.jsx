import Login from './pages/Login.jsx'
import Hero from "./components/Hero.jsx";
import {Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup.jsx";
import TermsAndConditions from "@/pages/TermsAndConditions.jsx";
import { Toaster } from 'react-hot-toast';
import Product from "@/pages/Product.jsx";

function App() {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/termsandconditions" element={<TermsAndConditions />} />
                <Route path="/product" element={<Product />} />
            </Routes>
        </>
    );
}

export default App;