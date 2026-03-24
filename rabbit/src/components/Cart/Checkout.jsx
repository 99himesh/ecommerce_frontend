import { useState } from "react";

const Checkout = () => {


 
 
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow">

          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          {/* Contact */}
          <h2 className="font-semibold mb-2">Contact Details</h2>
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-3 rounded-md mb-6"
          />

          {/* Delivery */}
          <h2 className="font-semibold mb-4">Delivery</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="First Name"
              className="border p-3 rounded-md w-full"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded-md w-full"
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-md md:col-span-2"
            />

            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-md"
            />

            <input
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded-md"
            />

            <input
              type="text"
              placeholder="Country"
              className="border p-3 rounded-md md:col-span-2"
            />

            <input
              type="text"
              placeholder="Phone"
              className="border p-3 rounded-md md:col-span-2"
            />

          </div>
       
            <button  className="mt-8 w-full bg-black text-white py-3 rounded-md">
            Continue to Payment
               </button>
           
            </div>
          
          
        

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">

          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {/* Product */}
          <div className="flex justify-between mb-3">
            <span>Product 1</span>
            <span>₹1200</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Product 2</span>
            <span>₹800</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹2000</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;