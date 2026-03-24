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
        <ProductDetails/>
       

        <FeatureSection/>
        </>
    )
}
export default Home;