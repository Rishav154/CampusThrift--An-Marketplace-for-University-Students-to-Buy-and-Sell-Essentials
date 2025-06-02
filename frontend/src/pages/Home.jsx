// Home.jsx
import HeaderDisplay from "@/components/HeaderDisplay.jsx";
import FilterMenu from "@/components/FilterMenu.jsx";
import ProductList from "@/components/ProductList.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import {useState} from "react";

function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="bg-orange-50">
            <Navbar showLoginButton={false} showHomeButton={false}/>
            <HeaderDisplay/>
            <FilterMenu currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <ProductList currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Footer/>
        </div>
    );
}

export default Home;
