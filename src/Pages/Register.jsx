

import { Link, useNavigate } from "react-router";
import LoginImage from "../assets/women.jpg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmailAsync } from "../feature/authSlice";
import { mergeCartRouteAsync } from "../feature/cartSlice";
const Register = () => {
  const [registerInput,setRegisterInput]=useState({
    name:"",
    email:"",
    password:""
  });
  const navigate=useNavigate()
   const dispatch=useDispatch();
  const {guestId}=useSelector(state=>state.auth);
  const signUpInputHandler=(e)=>{
    const {name,value}=e.target;
     setRegisterInput({...registerInput,[name]:value})
  }

  const registerHandler=async()=>{
       console.log("res");
    
     try {
      const data={...registerInput}
       const res=await dispatch(registerWithEmailAsync({data})).unwrap();
      if(res.status){
        const data={guestId:guestId}
               await dispatch(mergeCartRouteAsync({data}))
        navigate("/checkout")
       }
       
     } catch (error) {
       console.log(error);
       
     }
     
  }
  return (
    <div className="flex ">

      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-gray-50">
        
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          
          <h2 className="text-center text-lg font-medium mb-2">Rabbit</h2>

          <h3 className="text-2xl font-semibold text-center mb-2">
            Hey there! 👋
          </h3>

          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your username and password to Login.
          </p>
           {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={registerInput?.name}
              onChange={(e)=>{signUpInputHandler(e)}}
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              value={registerInput?.email}
              onChange={(e)=>{signUpInputHandler(e)}}
              type="email"
              placeholder="Enter your email address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              value={registerInput?.password}
              onChange={(e)=>{signUpInputHandler(e)}}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Button */}
          <button  onClick={(e)=>{registerHandler()}} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
           Register
          </button>

          <Link to={"/login"} className="text-center text-sm mt-4">
            Don’t have an account?
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>

        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={LoginImage}
          alt="fashion"
          className="h-[750px] w-full object-cover"
        />
      </div>

    </div>
  );
};

export default Register;