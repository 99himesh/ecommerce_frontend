
import { Link } from "react-router";
import HeroImage from "../../assets/hero.webp"
const Hero=()=>{
    return(
        <section className="relative">
         <img src={HeroImage} alt="rabbit"
         className="w-full h-[400px] md:h-[600] lg:h-[750px] object-cover"
         />
         <div className="absolute inset-0 bg-black/4 flex justify-center items-center" >
            <div className="text-center text-white p-6">
                <h1 className="text-4xl md:text-9xl font-bold">
                    VACATION <br/> READY
                </h1>
                <p className="text-sm mb-6">Explore Our vacation ready </p>
                <Link to={"/collections/all"} className="bg-white text-gray-590 px-6 py-2 rounded-sm text-black" >Shop Now </Link>

            </div>

         </div>
        </section>
    )
}
export default Hero;