import { Link } from "react-router";
import men from "../../assets/men.webp"
import women from "../../assets/women.jpg"
const GenderCollectionSection=()=>{
    return(
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* Women collection */}
                <div className="relative flex-1">
                    <img
                    src={women}
                    alt="women colllection"
                    className="w-full h-[700px] object-cover"
                    />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3"> 
                            Women's collection
                        </h2>
                        <Link to={"/collections/Women"}
                        
                        className="text-gray-900 underline"
                        >
                            Shop Now
                        </Link>
                    </div>

                </div>
                 {/* MEN collection */}
                <div className="relative flex-1">
                    <img
                    src={men}
                    alt="women colllection"
                    className="w-full h-[700px] object-cover"
                    />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3"> 
                            Men's collection
                        </h2>
                        <Link to={"/collections/Men"}
                        
                        className="text-gray-900 underline"
                        >
                            Shop Now
                        </Link>
                    </div>

                </div>

            </div>

        </section>
    )
}
export default GenderCollectionSection;