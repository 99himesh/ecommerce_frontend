const express=require("express");
const CheckOut=require("../model/checkout.js");
const Product=require("../model/product.js");
const Cart=require("../model/cart.js");
const Order=require("../model/order.js");
const {protect,admin}=require("../middleware/protect") ;
const router=express.Router();



// checkout


router.post("/",protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
    if(!checkoutItems || !checkoutItems.length){
      return res.status(404).json({message:""});
    }
    try {

      //reate new checkout order
      const newCheckout=await CheckOut.create({
        user:req.user._id,
        checkoutItems:checkoutItems,
        shippingAddress:shippingAddress,
        paymentMethod:paymentMethod,
        totalPrice:totalPrice,
        isPaid:false,
        paymentStatus:"Pending"

      });      
    res.status(201).json({newCheckout})
      
    } catch (error) {
      console.log(error,"Error while crating");
      res.status(500).json({message:"Internal server error"})
    }
});

//update checkout after successfull payment
// private

router.put("/:id/pay",protect,async(req,res)=>{
  const {paymentStatus,paymentDetails}=req.body;
  try {

    const checkout =await CheckOut.findById(req.params.id);
    if(!checkout){
      return res.status(404).json({messgae:"Checkout not found"});
    }

    if(paymentStatus=="Paid" ){
      checkout.isPaid=true,
      checkout.paymentStatus=paymentStatus,
      checkout.paymentDetails=paymentDetails,
      checkout.paidAt=Date.now(),
      await checkout.save();
      res.status(200).json(checkout);
    }else{
      res.status(400).json({message:"Invalid status"})
    }
    
  } catch (error) {
    console.log(error);
    rs.status(500).json("Internal server error")
    
  }
});




// fializeorder

router.post("/:id/finalize",protect,async(req,res)=>{
  try {
  
    
    const checkout=await CheckOut.findById(req.params.id);
    console.log(checkout,"checkout");
    
    if(!checkout){
      return res.json({message:"Checkout not found"})
    }
    if(checkout.isPaid && !checkout.isFinalized){
      //create order 
      const finalOder=await Order.create({
        user:checkout.user,
        orderItems:checkout.checkoutItems,
        shippingAddress:checkout.shippingAddress,
        paymentMethod:checkout.paymentMethod,
        totalPrice:checkout.totalPrice,
        isPaid:true,
        paidAt:checkout.paidAt,
        isDelivered:false,
        paymentStatus:"Paid",
        paymentDetails:checkout.paymentDetails ,
      });
      //finalize 
      checkout.isFinalized=true;
      checkout.finalizedAt=Date.now();
      await checkout.save();

      // delete from cart
      await Cart.findByIdAndDelete({user:checkout.user});
      return res.status(201).json(finalOder)
    }else if(checkout.isFinalized){
      return res.status(404).json({message:"checkout already finalized"})
    }else{
       res.status(400).json({message:"Checkout is not paid"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({mesage:"Internal server error"})
    
    
  }
})

  
module.exports=router
