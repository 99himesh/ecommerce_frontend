import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartDrawerHandler, deleteCartAsync, getCartAsync, updateCartAsync } from "../../feature/cartSlice";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { getUserAsync } from "../../feature/authSlice";
import Cookies from "js-cookie";
const CartDrawer=()=>{ 
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {userId,guestId}=useSelector(state=>state?.auth);
    const {cartDrawer,cart}=useSelector(state=>state?.cart)
    const token=Cookies.get("token");
    const getCart=async()=>{
       try {
        const data={}
        if(guestId){
            data.guestId=guestId
        }else{
            data.userId=userId
        }
        const res=await dispatch(getCartAsync({data})).unwrap();
        
        
       } catch (error) {
        
       }
    }
    const cartDeleteHandler=async(item)=>{        
         const data={
            productId:item?.productId,
            size:item?.size,
            color:item?.color
         };
        if(userId){
          data.userId=userId
        }else{
          data.guestId=guestId
        }
    
        try {
            const res=await dispatch(deleteCartAsync({data})).unwrap();
            if(res.status){
                toast.success(res.message);
                getCart();
                dispatch(getUserAsync({token}))
            }
            
            
        } catch (error) {
            
        }
    

    } 
    
    
    const updateCartHandler=async(item,status)=>{        
         const data={
            productId:item?.productId,
            size:item?.size,
            color:item?.color,
            quantity:status=="increase"?item?.quantity+1:item?.quantity-1
         };
          if(userId){
          data.userId=userId
        }else{
          data.guestId=guestId
        }
        try {
            const res=await dispatch(updateCartAsync({data})).unwrap();
            if(res.status){
                getCart()
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

      const checkOutHandler=()=>{
        dispatch(cartDrawerHandler(false))
        
        if(userId){
        navigate("/checkout");
        }else{
            navigate("/login")
        }
      }
     useEffect(()=>{
        getCart();
     },[])
    return(
       <div
  className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
  ${cartDrawer ? "translate-x-0" : "translate-x-full"}`}
>

        {/* close button */}
        <div className="flex justify-end p-4">
            <button onClick={()=>{dispatch(cartDrawerHandler(false))}}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>

        </div>
        {/* Cart content */}

        <div className="flex flex-col overflow-y-auto flex-grow p-4">
            <h2 className="text-xl font-semibold mb-4">
                Your cart
            </h2>

        {cart?.products?.map((item) => {

                return (
                     <>
                    <div
                    key={item?._id}
                    className="flex  justify-between border rounded-2xl p-4 mb-4 shadow-sm"
                    >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                        <img
                        src={item?.image }
                        alt={item?.name}
                        className="w-20 h-20 object-cover rounded-xl"
                        />

                        <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold">{item?.name}</h2>
                        <p className="text-gray-500">₹{item?.price}</p>
                         <div className="flex items-center gap-3">
                        <button
                        onClick={()=>{updateCartHandler(item,"decrease")}}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg"
                        >
                        -
                        </button>

                        <span className="text-lg font-medium">{item?.quantity}</span>

                        <button
                        onClick={()=>{updateCartHandler(item,"increase")}}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg"
                        >
                        +
                        </button>
                    </div>
                        </div>
                    </div>

                    {/* Counter */}
                        {/* Total */}
                   
                   
                     <div className="flex flex-col  gap-2 ">
                        <p className="font-semibold">
                           ₹{item?.price * item?.quantity}
                        </p>
                          <div className="flex justify-end cursor-pointer" onClick={()=>{cartDeleteHandler(item)}}>
                        <MdDelete  style={{fontSize:"20px" }}/>
                    </div>
                    
                    </div>
                    </div>

                    
                    </>

                );
                })}

                        



        </div>
        {/* checkout button */}
        <div className="p-4 bg-white sticky bottom-0">
        <button onClick={()=>{checkOutHandler()}} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition ">Checkout</button>
        <p>
            Shipping ,Taxes and discount codes calcu
        </p>

        </div>
        </div>
    )
}
export default CartDrawer;