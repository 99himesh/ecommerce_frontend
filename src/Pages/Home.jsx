import Hero from "../components/Layout/Hero";
import FeatureSection from "../components/Product/FeatureSection";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import NewArrival from "../components/Product/NewArrivals";
import ProductDetails from "../components/Product/ProductDetails";

const Home=()=>{
    return(
        <>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrival/>
        <h3 className="text-center font-semibold text-3xl"> Best Seller</h3>
        <ProductDetails/>
        <FeatureSection/>
        </>
    )
}
export default Home;