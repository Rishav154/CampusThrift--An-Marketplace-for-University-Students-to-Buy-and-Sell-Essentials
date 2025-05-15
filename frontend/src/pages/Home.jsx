import HeaderDisplay from "@/components/HeaderDisplay.jsx";
import FilterMenu from "@/components/FilterMenu.jsx";
import ProductList from "@/components/ProductList.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

function Home() {
    return (
        <>
            <div className={"bg-orange-50"}>
                <Navbar showLoginButton={false} showHomeButton={false}/>
                <HeaderDisplay/>
                <FilterMenu/>
                <ProductList/>
                <Footer/>
            </div>
        </>
    );
}

export default Home;