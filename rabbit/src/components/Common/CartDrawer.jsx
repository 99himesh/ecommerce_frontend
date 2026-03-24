import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";

const CartDrawer=({setCartDrawer,cartDrawer})=>{
    const navigate=useNavigate();
    return(
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
         ${cartDrawer?"translate-x-0":"translate-x-full"}`}>

        {/* close button */}
        <div className="flex justify-end p-4">
            <button onClick={()=>{setCartDrawer(false)}}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>

        </div>
        {/* Cart content */}

        <div className="flex overflow-y-auto flex-grow p-4">
            <h2 className="text-xl font-semibold mb-4">
                Your cart
            </h2>

        </div>
        {/* checkout button */}
        <div className="p-4 bg-white sticky bottom-0">
        <button onClick={()=>{setCartDrawer(false),navigate("/checkout")}} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition ">Checkout</button>
        <p>
            Shipping ,Taxes and discount codes calcu
        </p>

        </div>
        </div>
    )
}
export default CartDrawer;