const express=require("express");
const Order=require("../model/order.js");
const {protect}=require("../middleware/protect") ;
const router=express.Router();


//your order

router.get("/my-order",protect,async(req,res)=>{
   try {
     const orders=await Order.find({user:req.user._id}).sort({createdAt:-1});
     if(!orders){
        return res.status(404).json({message:"Order not found"})
     }
     res.status(200).json(orders)
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
   }
})


router.get("/:id",protect,async(req,res)=>{
   try {
     const orderDetails=await Order.findById(req.params.id).populate("user");
     if(!orderDetails){
        return res.status(400).json({message:"Order not found"});
     }
     res.status(200).json({orderDetails,message:"Order details fetched successfully"})
   } catch (error) {
    res.status(500).json("Internal server error")
   }
});


module.exports=router;


