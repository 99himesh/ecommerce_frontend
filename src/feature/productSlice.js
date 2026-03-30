import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";

const initialState = {
    products:[],
    productDetails:{},
    similerProducts:[],
    bestSeller:{},
    newArrival:[],
    isLoading:false,
    error:null
};
export const getProductAsync = createAsyncThunk(
  "product/productAsync",
 async ({data}) => {
        try {
      const res = await api.get(`/products`,{
        headers: {
          "Content-Type": "application/json",
        },
       params: {
            ...data
            }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const getProductDetailsAsync = createAsyncThunk(
  "product/productDetailsAsync",
 async ({id}) => {
        try {
      const res = await api.get(`/products/${id}`,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const getSimilerProductAsync = createAsyncThunk(
  "product/similerProductAsync",
 async ({id}) => {
        try {
      const res = await api.get(`/products/similer/${id}`,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);
export const getNewArrivalProductAsync = createAsyncThunk(
  "product/newArrivalProductAsync",
 async () => {
        try {
      const res = await api.get(`/products/new-arrival`,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);
export const getBestSellerProductAsync = createAsyncThunk(
  "product/bestSellerProductAsync",
 async () => {
        try {
      const res = await api.get(`/products/best-seller`,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
       builder.addCase(getProductAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getProductAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.products=action.payload;
               
              });
      builder.addCase(getProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });

      builder.addCase(getProductDetailsAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getProductDetailsAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.productDetails=action.payload.data;
               
              });
      builder.addCase(getProductDetailsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
        builder.addCase(getSimilerProductAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getSimilerProductAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.similerProducts=action.payload.data;
              });
      builder.addCase(getSimilerProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
       builder.addCase(getNewArrivalProductAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getNewArrivalProductAsync.fulfilled, (state, action) => {                
                state.isLoading = false;
                state.newArrival=action.payload;
              });
      builder.addCase(getNewArrivalProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              });
       builder.addCase(getBestSellerProductAsync.pending, (state) => {
                state.isLoading = true;
              });
       builder.addCase(getBestSellerProductAsync.fulfilled, (state, action) => {        
                state.isLoading = false;
                state.bestSeller=action.payload.data;
              });
      builder.addCase(getBestSellerProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                
                state.error = action.payload;
              });
  },
});
export default productSlice.reducer;

