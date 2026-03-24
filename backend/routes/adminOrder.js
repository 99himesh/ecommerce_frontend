const express = require("express");
const Order = require("../model/order");
const { protect,admin } = require("../middleware/protect");
const router = express.Router();




router.get("/",protect,admin,async(req,res)=>{
    try {
       const order=await Order.find({});
    if(!order){
        return res.status(404).json({message:"Order not found"})
    }

    return res.status(200).json({order,message:"order fetched successfully"})
   
        
    } catch (error) {
        
    } 
});




router.put("/:id",protect,admin,async(req,res)=>{
    const {status}=req.body;
    try {
       const order=await Order.findById(req.params.id);
   if(order){
     order.status=status || order.status;
     order.isDelivered=status=="Delivered"?true :order.isDelivered;
     const upodateOrder=await order.save();
     res.status(200).json(upodateOrder)
   }else{
    res.status(404).json({message:"Order not found"})
   }  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    } 
})

module.exports=router;