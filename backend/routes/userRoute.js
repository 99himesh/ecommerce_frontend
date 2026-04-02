const express=require("express");
const User=require("../model/users.js");
const Cart=require("../model/cart.js");
const jwt=require("jsonwebtoken");
const {protect} = require("../middleware/protect.js");

const router=express.Router();



router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    
    try {
       let user=await User.findOne({email});       
       if(user){
        res.status(400).json({message:"User already exist"})
       }
       user=new User({name,email,password});       
       await user.save();       

       //create jwt token
       const payload={user:{id:user._id,role:user.role}};

        jwt.sign(payload,process.env.JWAT_SECRET,{expiresIn:"24h"},(err,token )=>{
            if(err) throw new err;
            res.status(200).json({
                user:{
                    _id:user?._id,
                    name:user?.name,
                    email:user?.email,
                    role:user?.role
                },
                token,
                success:true
            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        //find user by email
        let user=await User.findOne({email});
        
        if(!user){
            res.status(400).json({message:"User not found"});
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
             res.status(400).json({message:"Invalid credential"});
        }
          //create jwt token
       const payload={user:{id:user._id,role:user.role}};

        jwt.sign(payload,process.env.JWAT_SECRET,{expiresIn:"24h"},(err,token )=>{
            if(err) throw new err;
            res.status(201).json({
                user:{
                    _id:user?._id,
                    name:user?.name,
                    email:user?.email,
                    role:user?.role
                },
                token,
                success:true

            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Intenal Server Error")
        
    }
});





router.get("/profile",protect,async(req,res)=>{
    const cartCount=await Cart.findOne({user:req?.user?._id});
    console.log(cartCount);
      
      
        res.json({user:req.user,cartCount:cartCount?.products?.length})
})


module.exports=router;