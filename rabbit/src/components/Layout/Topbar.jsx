import { Link } from "react-router";
import {TbBrandMeta} from "react-icons/tb";
import {IoLogoInstagram} from "react-icons/io";
import {RiTwitterXLine} from "react-icons/ri";
const Topbar =()=>{
    return(
        <div className="bg-primary text-[#fff]">
            <div className="container mx-auto flex justify-between items-center py-4 px-3">
                {/* icons */}
                <div className="hidden md:flex items-center space-x-4 ">
                    <Link className="hover:text-gray-400">
                    <TbBrandMeta className="h-5 w-5"/>
                    </Link>
                     <Link className="hover:text-gray-400">
                    <IoLogoInstagram className="h-5 w-5"/>
                    </Link>
                     <Link className="hover:text-gray-400">
                    <RiTwitterXLine className="h-4 w-4"/>
                    </Link>

                </div>
                {/*  Address */}

                <div className="text-sm text-center flex-grow">
                    <span>
                        We wish world wide -Fast and reliable shipping !
                    </span>
                </div>
                {/*  Number */}
                <div className="hidden md:block text-sm">
                    <Link to={"tel:8081648805"} className="hover:text-gray-400">
                    +91 8081648805
                    </Link>

                </div>

            </div>
        
        </div>
    )
}
export default Topbar;