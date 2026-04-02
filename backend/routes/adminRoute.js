const express = require("express");
const User = require("../model/users");
const { protect,admin } = require("../middleware/protect");
const router = express.Router();




// get all users
router.get("/",protect,admin,async(req,res)=>{
    try {
     const users=await User.find({});
     if(!users){
        return res.status(404).json({message:"User not found"})

     }
     res.status(200).json({users,message:"User fetched successsfull"})
        
    } catch (error) {
         console.log(error);
         res.status(500).json("INTERNAL SERVER ERROR!")
         
    }
})


router.post("/",protect,admin,async(req,res)=>{
    const {name,email,role,password}=req.body;
    
    try {   
      let user =await User.findOne({email});
      
      if(user){
        return res.status(400).json({message:"User already exist"})
      }
       user=new User({
        name,email,password,role:role|| "Customer"

      });
      await user.save();
      
     res.status(200).json({user,message:"User Created successsfull"})
        
    } catch (error) {
         console.log(error);
         res.status(500).json("INTERNAL SERVER ERROR!")
         
    }
})

router.put("/:id",protect,admin,async(req,res)=>{
    const {name,email,role,password}=req.body;
    try {
     const users=await User.findById(req.params.id);
     if(!users){
        return res.status(404).json({message:"User not found"})

     }
     users.name=name || users.name;
     users.email=email || users.email;
     users.role=role || users.role;
     users.password=password || users.password;
    await users.save(); 
    res.status(200).json({users,message:"User update successfullly"}); 
    } catch (error) {
         console.log(error);
         res.status(500).json("INTERNAL SERVER ERROR!")
         
    }
});



router.delete("/:id",protect,admin,async(req,res)=>{
    try {
     const users=await User.findById(req.params.id);
     if(!users){
        return res.status(404).json({message:"User not found"})

     }
     await users.deleteOne();
     res.status(200).json({message:"User deleted successfully"})
        
    } catch (error) {
         console.log(error);
         res.status(500).json("INTERNAL SERVER ERROR!")
         
    }
})

module.exports=router