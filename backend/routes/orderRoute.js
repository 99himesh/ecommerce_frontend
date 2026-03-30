const express=require("express");
const Order=require("../model/order.js");
const Cart=require("../model/cart.js");
const {protect}=require("../middleware/protect") ;
const router =express.Router();
const crypto =require("crypto");
const { instance } = require("../config/PaymentInstance.js");
console.log(process.env.RAZORPAY_SECRET);

router.post("/checkout",protect,async(req,res)=>{
   const {amount}=req.body;
     const options = {
     amount: Number(amount)*100,  
     currency: "INR"
   };
   
   const order=await instance.orders.create(options);
   res.status(200).json({success:true,order})
})

router.post("/paymentVerification",protect,async(req,res)=>{
     const {user, checkoutItems, shippingAddress, totalPrice, isPaid, paidAt, isDelivered, deliverAt, phoneNumber, email, status, razorpay_payment_id, razorpay_order_id, razorpay_signature}=req.body;
     
     console.log(process.env.RAZORPAY_SECRET);
     
     
          let body =razorpay_order_id+"|"+razorpay_payment_id;
          const exceptedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET)
                                                  .update(body.toString())
                                                  .digest('hex');
            if(exceptedSignature===razorpay_signature){              
            await Order.create({
              razorpay_payment_id,razorpay_order_id,razorpay_signature,
              user, checkoutItems, shippingAddress, totalPrice, isPaid, paidAt, isDelivered, deliverAt, phoneNumber, email, status,
            }); 
             await Cart.findOneAndDelete({ user: user });
             
               res.status(200).json({success:true,razorpay_payment_id})
            }else{
              res.status(400).json({message:"Payment Failed"})
            }
});



router.get("/order",protect,async(req,res)=>{
    try {
      const order = await Order.find({ user: req?.user?._id });
       
    if(!order){
        return res.status(404).json({message:"Order not found"})
    }

    return res.status(200).json({order,message:"order fetched successfully"})
   
        
    } catch (error) {
        
    } 
});
module.exports=router;






