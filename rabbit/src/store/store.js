import {  configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice.js"
import productReducer from "../feature/productSlice.js";
import cartReducer from "../feature/cartSlice.js";
import orderReducer from "../feature/orderSlice.js"
const store=configureStore({
    reducer:{
       auth:authReducer,
       product:productReducer,
       cart:cartReducer,
       order:orderReducer
    }
})

export default store;