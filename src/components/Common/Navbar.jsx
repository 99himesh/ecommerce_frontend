import { Link } from "react-router";
import {HiOutlineUser,HiOutlineShoppingBag,HiBars3BottomRight} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { cartDrawerHandler } from "../../feature/cartSlice";
import { Image } from "antd";
import logo from "../../assets/logo.svg";
import Cookies from "js-cookie"
const Navbar =()=>{
    const userId=Cookies.get("userId");
    const dispatch=useDispatch();
    const {cart}=useSelector(state=>state.cart)
    const {cartDrawer}=useSelector(state=>state.cart)
    const [menuHeader,setMenuHeader]=useState(false);
    const {user}=useSelector(state=>state.auth);


    return(
        <>
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">

            {/* Left Logo  */}
            <div>
                <Link to={"/"} className="text-2xl font-medium">
                  <Image preview={false} src={logo}/>
                </Link>
            </div>
            {/*  center navigation */}
            <div className="hidden md:flex space-x-6">
              <Link to={"/collections/Men"} className="text-gray-500 hover:text-black text-sm font-medium uppercase">
              Men
              </Link>
              <Link to={"/collections/Women"} className="text-gray-500 hover:text-black text-sm font-medium uppercase">
              Women
              </Link>
              <Link to={"/collections/Topwear"} className="text-gray-500 hover:text-black text-sm font-medium uppercase">
              Top wear
              </Link>
              <Link to={"/collections/BottomWear"} className="text-gray-500 hover:text-black text-sm font-medium uppercase">
              Botton Wear
              </Link>
            </div>

            {/* Right section */}
               <div className="flex items-center space-x-6">
                <Link to={userId?`/profile`:`/login`}>
                   <HiOutlineUser className="h-6 w-6 text-gray-700"/>
                </Link>
                <Link onClick={()=>{dispatch(cartDrawerHandler(true))}}  className="relative">
                   <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
               {user?.cartCount>0 &&  <spam className={"bg-primary text-white absolute -top-3 -right-3 text-sm rounded-full px-2 py-0.5"}>{user?.cartCount}</spam>}
                </Link>
               {/* searchbar */}
                 <SearchBar/>
                 
                <button  onClick={()=>{setMenuHeader(true)}} className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-gray-700"/>
                </button>
                 
            </div>

        </nav>
        <CartDrawer  cartDrawer={cartDrawer}/>

        {/* Mobile navigation */}
        {menuHeader && (
            <div
                onClick={() => setMenuHeader(false)}
                className="fixed inset-0  bg-black/40 z-40"
            />
            )}

      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-1000  z-50 
         ${menuHeader?"translate-x-0":"-translate-x-full"}`}>
         <div className="flex justify-end p-4">
            <button onClick={()=>{setMenuHeader(false)}}>
                <IoMdClose/>
            </button>
         </div>
         <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
            <nav className="flex flex-col space-y-4">
                <Link onClick={()=>{setMenuHeader(false)}} className="text-gray-600 hover:text-black" to={"/"}>Men</Link>
                <Link onClick={()=>{setMenuHeader(false)}} className="text-gray-600 hover:text-black" to={"/"}>Women</Link>
                <Link onClick={()=>{setMenuHeader(false)}} className="text-gray-600 hover:text-black" to={"/"}>Top wear</Link>
                <Link onClick={()=>{setMenuHeader(false)}} className="text-gray-600 hover:text-black" to={"/"}>Bottom wear</Link>

            </nav>
         </div>
        </div>
        </>

    )
}
export default Navbar;