import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";
const initialState = {
    order:[],
    checkout:{},
    isLoading:false,
    error:null
};
export const checkOutAsyncAsync = createAsyncThunk(
  "cart/checkoutAsync",
 async ({data,token}) => {
        try {
      const res = await api.post(`/payment/checkout`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return res?.data; 
    } catch (error) {
        console.log(error);
      return error;
    }
  }
);
export const orderAsyncAsync = createAsyncThunk(
  "cart/orderAsync",
 async ({data,token}) => {
        try {
      const res = await api.post(`/payment/paymentVerification`,data,{
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        }
      });
      return res?.data; 
    } catch (error) {
        console.log(error);
      return error;
    }
  }
);
export const getOrderAsync = createAsyncThunk(
  "order/getorderAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/payment/order`,{
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        }
      });
      return res?.data; 
    } catch (error) {
        console.log(error);
      return error;
    }
  }
);



export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
       builder.addCase(checkOutAsyncAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(checkOutAsyncAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.checkout=action.payload?.order;
               
              });
      builder.addCase(checkOutAsyncAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
          builder.addCase(orderAsyncAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(orderAsyncAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
               
              });
      builder.addCase(orderAsyncAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
               
               builder.addCase(getOrderAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getOrderAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.order=action.payload?.order;
               
              });
      builder.addCase(getOrderAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
              
     
              
              
              

  },
});
export default orderSlice.reducer;

