

import { Link } from "react-router";
import LoginImage from "../assets/women.jpg"
const Register = () => {
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
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
           Register
          </button>

          <Link to={"/login"} className="text-center text-sm mt-4">
            Don’t have an account?{" "}
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