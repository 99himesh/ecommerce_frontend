import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCartAsync } from "../feature/cartSlice.js";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"
const ThankYouPage = () => {
  const [show, setShow] = useState(false);
  const dispatch=useDispatch();
const navigate=useNavigate();
const userId=Cookies.get("userId");
const {id}=useParams();
 const getCart=async()=>{
       try {
        const data={
            userId:userId
        }
        const res=await dispatch(getCartAsync({data})).unwrap();        
       } catch (error) {
          console.log(error);
          
       }
    }
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
    getCart()
  }, []);

  return (
    <div className="h-[60vh] flex items-center justify-center bg-white">
      
      <div
        className={`bg-white p-10 rounded-2xl shadow-2xl text-center transform transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* ✅ Animated Check */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center animate-scaleIn">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#214344] mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
         <p className="text-gray-500 mb-6">
          PaymentId :{id}
        </p>

        <button
          onClick={() => (navigate("/order"))}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition"
        >
          See Your Order
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;