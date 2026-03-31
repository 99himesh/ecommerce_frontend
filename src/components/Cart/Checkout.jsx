import { useState } from "react";
import Razorpay from "razorpay"
import {useDispatch, useSelector} from "react-redux"
import { checkOutAsyncAsync, orderAsyncAsync } from "../../feature/orderSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
const Checkout = () => {
   const dispatch=useDispatch();
  const {cart}=useSelector(state=>state.cart);
  const navigate=useNavigate();
  const token=Cookies.get("token");
  const userId=Cookies.get("userId");
  const totalPrice= cart?.products?.reduce((acc,current)=>acc+current?.price,0)
  const [checkOutInput,setCheckOutInput]=useState({
        email:"",
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalCode:"",
        country:"",
        phoneNumber:""    
      })

   const checkOutInputHandler=(e)=>{
          const {name,value}=e.target;
          setCheckOutInput({...checkOutInput,[name]:value})
        }
    const checkoutHandler=async()=>{
       
      try {
      const data={amount:totalPrice}
      const res=await dispatch(checkOutAsyncAsync({data,token})).unwrap();
      
      
      if(res?.success){
        toast.success("Order created successfully");
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong")
      
    }
  }  
   const checkoutItem=cart?.products?.map((item,id)=>{
    return { 
      productId:item?.productId,
      name:item?.name,
      image:item?.image,
      price:item?.price,
      size:item?.size,
      color:item?.color,
      quantity:item?.quantity
    }
   })
   
  const paymentVerification=async(item)=>{
      try {
        const data={
          razorpay_payment_id:item?.razorpay_payment_id,
          razorpay_order_id:item?.razorpay_order_id,
          razorpay_signature:item?.razorpay_signature,
          user:userId,
          checkoutItems:checkoutItem,
          shippingAddress:{
            address:checkOutInput?.address,
            city:checkOutInput?.city,
            postalCode:checkOutInput?.postalCode,
            country:checkOutInput?.country
          },
          totalPrice:totalPrice,
          isPaid:true,
          paidAt:new Date(),
          isDelivered:false,
          deliverAt:null,
          phoneNumber:checkOutInput?.phoneNumber,
          email:checkOutInput?.email,
        }
        const res=await dispatch(orderAsyncAsync({data,token})).unwrap();
        if(res.success){
            navigate(`/thankyou/${res.razorpay_payment_id}`)
        }else{
       navigate("/paymentFailed")

        }
      } catch (error) {
        toast.error("Something Went wrong please try again")
        console.log(error);
      }
  }

 const payHandler=async()=>{
   const hasFalsy = Object.values(checkOutInput).some(value => !value);
        if(hasFalsy){
          return toast.error("Please enter all field")
        }
    const {order}=await checkoutHandler()
     const options = {
        key: 'rzp_test_SQbjbgFl5E0fbf', // Replace with your Razorpay key_id
        amount: totalPrice*100 , // Amount is in currency subunits.
        currency: 'INR',
        name: 'Rabbit',
        description: 'Test Transaction',
        order_id: order?.id, // This is the order_id created in the backend
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
          handler:function (response){
            const item={
              razorpay_payment_id:response?.razorpay_payment_id,
              razorpay_order_id:response?.razorpay_order_id,
              razorpay_signature:response?.razorpay_signature
            }
            paymentVerification(item)
            },
        };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response){
        
       navigate("/paymentFailed")
  })
}





 
 
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow">

          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          {/* Contact */}
          <h2 className="font-semibold mb-2">Contact Details</h2>
          <input
            name="email"
            onChange={(e)=>{checkOutInputHandler(e)}}
            value={checkOutInput?.email}
            type="email"
            placeholder="Email"
            className="border w-full p-3 rounded-md mb-6"
          />

          {/* Delivery */}
          <h2 className="font-semibold mb-4">Delivery</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
             name="firstName"
            onChange={(e)=>{checkOutInputHandler(e)}}
            value={checkOutInput?.firstName}
            type="text"
              placeholder="First Name"
              className="border p-3 rounded-md w-full"
            />

            <input
             name="lastName"
            onChange={(e)=>{checkOutInputHandler(e)}}
            value={checkOutInput?.lastName}
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded-md w-full"
            />

            <input
             name="address"
             onChange={(e)=>{checkOutInputHandler(e)}}
             value={checkOutInput?.address}
              type="text"
              placeholder="Address"
              className="border p-3 rounded-md md:col-span-2"
            />

            <input
             name="city"
             onChange={(e)=>{checkOutInputHandler(e)}}
             value={checkOutInput?.city}
              type="text"
              placeholder="City"
              className="border p-3 rounded-md"
            />

            <input
             name="postalCode"
             onChange={(e)=>{checkOutInputHandler(e)}}
             value={checkOutInput?.postalCode}
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded-md"
            />

            <input
              name="country"
              onChange={(e)=>{checkOutInputHandler(e)}}
              value={checkOutInput?.country}
              type="text"
              placeholder="Country"
              className="border p-3 rounded-md md:col-span-2"
            />

            <input
              name="phoneNumber"
              onChange={(e)=>{checkOutInputHandler(e)}}
              value={checkOutInput?.phoneNumber}
              type="text"
              placeholder="Phone"
              className="border p-3 rounded-md md:col-span-2"
            />

          </div>
       
            <button onClick={()=>{payHandler()}}  className="mt-8 w-full bg-primary text-white py-3 rounded-md">
            Continue to Payment
               </button>
           
            </div>
          
          
        

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">

          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {/* Product */}
          {/* <div className="flex justify-between mb-3">
            <span>Product 1</span>
            <span>₹1200</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Product 2</span>
            <span>₹800</span>
          </div> */}
          {cart?.products?.map((item,idx)=>{
            return(
              <>
              <div className="flex items-center justify-between mb-4">
  
                {/* LEFT: IMAGE + NAME */}
                  <div className="flex items-center gap-3">
                    <img
                      src="https://picsum.photos/80"
                      alt="product"
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div>
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-gray-500">Qty:{item?.quantity}</p>
                    </div>
                  </div>

                  {/* RIGHT: PRICE */}
                  <span className="font-semibold">₹ {item?.price}</span>
                </div>
              </>
            )
          })}

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹ {totalPrice}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;