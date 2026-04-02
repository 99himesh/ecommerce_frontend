const express=require("express");
const multer=require("multer");
const cloudinary=require("cloudinary").v2;
const stramifier=require("streamifier");
const router=express.Router();
require("dotenv").config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET_KEY
});



//multer setup
const storage=multer.memoryStorage();
const upload=multer({storage});


router.post("/",upload.single("image"),async (req,res)=>{
    
    try {
        if(!req.file){
           return res.status(400).json({message:"File not found"})
        }
        //fn to upload coudinary stream

        const streamUpload=async(fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject(error)
                    }
                })
                //use streamifier to convert file buffer to stream
              stramifier.createReadStream(fileBuffer).pipe(stream)
            })
        }
        //call streamUpload function 
        const result =await streamUpload(req.file.buffer);
         
        //Respond with the uploaded the image Url
        res.json({imageUrl:result.secure_url})

        
        
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"Internal server error"})
    }

})

module.exports=router;