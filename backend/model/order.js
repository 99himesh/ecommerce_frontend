const mongoose=require("mongoose");


const orderItemSchema=new mongoose.Schema({
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        size:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    
    },{_id:false}
);

const orderSchema=new mongoose.Schema({

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        checkoutItems:[orderItemSchema],
        shippingAddress:{
            address:{type:String,required:true},
            city:{type:String,required:true},
            postalCode:{type:String,required:true},
            country:{type:String,required:true}
        },
        
        totalPrice:{
            type:Number,
            required:true
        },
        isPaid:{
            type:Boolean,
            default:false
        },
        paidAt:{
            type:Date
    
        },
        isDelivered:{
          type:Boolean,
          default:false
        },
        deliverAt:{
            type:Date
    
        },
        phoneNumber:{
           type:String,
           required:true
        },
        email:{
            type:String,
            required:true
        },
        
        status:{
            type:String,
            enum:["Processing","Shipped","Delivered","Cancelled"],
            default:"Processing"
        },
         razorpay_payment_id:{
                type:String,
                required:true
        },
        razorpay_order_id:{
          type:String,
          required:true
        },
        razorpay_signature:{
          type:String,
          required:true
        }
        
      
    
    
    },{timestamps:true});


    const Order=mongoose.model("Order",orderSchema) ;

    module.exports=Order;

    
