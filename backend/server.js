const express=require('express');
const cors=require("cors");
const dotenv=require("dotenv");
const connectDb=require("./config/db.js");
const userRoute=require("./routes/userRoute.js")
const productRoutes=require("./routes/productRoutes.js")
const cartRoute=require("./routes/cartRoute.js")
const checkoutRoute=require("./routes/checkOutRoutes.js")
const orderRoute=require("./routes/orderRoute.js")
const uploadRoute=require("./routes/uploadRoute.js");
const paymentRoute=require("./routes/orderRoute.js")
const adminUserRoute=require("./routes/adminRoute.js")
const adminOrderRoute=require("./routes/adminOrder.js");
const bodyParser=require("body-parser")
const app= express();

dotenv.config();
const PORT=process.env.PORT ||8000 ;
//middleware 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: "*"
}));


// mongo db connected
connectDb()


//API Route
app.use("/api/users",userRoute)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoute)
app.use("/api/checkout",checkoutRoute)
app.use("/api/order",orderRoute)
app.use("/api/upload",uploadRoute)
app.use("/api/payment",paymentRoute)


//adminRoute
app.use("/api/admin/users",adminUserRoute)
app.use("/api/admin/order",adminOrderRoute)




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})




