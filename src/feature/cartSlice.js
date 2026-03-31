import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";
import Cookies from "js-cookie" 
const initialState = {
    cart:[],
    cartDrawer:false,
    isLoading:false,
    error:null
};
export const addToCartCartAsync = createAsyncThunk(
  "cart/cartAsync",
 async ({data}) => {
        try {
      const res = await api.post(`/cart`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; 
    } catch (error) {
      return error;
    }
  }
);
export const getCartAsync = createAsyncThunk(
  "cart/getcartAsync",
 async ({data}) => {
        try {
      const res = await api.get(`/cart`,{
        headers: {
          "Content-Type": "application/json",
        },
        params:{
          ...data
        }
      });
      return res?.data; 
    } catch (error) {
      return error;
    }
  }
);
export const deleteCartAsync = createAsyncThunk(
  "cart/deletecartAsync",
 async ({data}) => {
  console.log(data);
  
        try {
      const res = await api.delete(`/cart`,{
        data,
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; 
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }
);


export const updateCartAsync = createAsyncThunk(
  "cart/updateCartAsync",
 async ({data}) => {  
        try {
      const res = await api.put(`/cart`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; 
    } catch (error) {
      return error;
    }
  }
);

export const mergeCartRouteAsync = createAsyncThunk(
  "cart/mergeCartAsync",
 async ({data}) => {
        try {
      const res = await api.post(`/cart/merge`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; 
    } catch (error) {
      return error;
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     cartDrawerHandler:(state,action)=>{
      state.cartDrawer=action.payload
     },
     cartResetHandler:(state,action)=>{
      state.cart=[]
     }
  },
  extraReducers: (builder) => {
       builder.addCase(addToCartCartAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(addToCartCartAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
               
              });
      builder.addCase(addToCartCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
      builder.addCase(getCartAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getCartAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.cart=action.payload.cart
               
              });
      builder.addCase(getCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
      builder.addCase(deleteCartAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(deleteCartAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
               
              });
      builder.addCase(deleteCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
       builder.addCase(updateCartAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(updateCartAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
               
              });
      builder.addCase(updateCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
      builder.addCase(mergeCartRouteAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(mergeCartRouteAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                Cookies.remove("guestId")
               
              });
      builder.addCase(mergeCartRouteAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
              
              
              

  },
});
export const {cartDrawerHandler,cartResetHandler}=cartSlice.actions;
export default cartSlice.reducer;

