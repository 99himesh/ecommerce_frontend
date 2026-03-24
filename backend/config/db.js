const mongoose=require("mongoose");

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/ecommerce`);
        console.log("Mongodb connnected successfully"); 
    } catch (error) {
        console.log("Mongodb connection failed ",error);
        process.exit(1)
        
    }
}

module.exports=connectDb;