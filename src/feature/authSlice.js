import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";
import Cookies from "js-cookie"
import getGuestId from "../utility/generateGuestId";
const token=Cookies.get("token");
const guestId=getGuestId();
const userId=Cookies.get("userId");

const initialState = {
    token:token || null,
    guestId:guestId ,
    userId:userId || null,
    isAuthenticated: !!token,
    user:{},
    isLoading:false,
    error:null
};

export const loginWithEmailAsync = createAsyncThunk(
  "auth/loginAsync",
 async ({data}) => {
        try {
      const res = await api.post(`/users/login`,data,{
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

export const registerWithEmailAsync = createAsyncThunk(
  "auth/registerAsync",
 async ({data}) => {
        try {
      const res = await api.post(`/users/register`,data,{
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

export const getUserAsync = createAsyncThunk(
  "auth/userAsync",
 async ({token}) => {
        try {
      const res = await api.get(`users/profile`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
      Cookies.remove("userId");
      // अगर चाहें तो guestId भी हटा सकते हैं, लेकिन आमतौर पर रहने देते हैं।
    },
  
    
  },
  extraReducers: (builder) => {
       builder.addCase(loginWithEmailAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(loginWithEmailAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.isAuthenticated=true;  
          state.token=action?.payload?.token;
          state.userId = action?.payload?.user?._id;
          Cookies.set("token", state.token, {
            expires: 1
          });
          Cookies.set("userId", state.userId, { expires: 1 });
          Cookies.remove("guestId");
         
        });
        builder.addCase(loginWithEmailAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
        builder.addCase(registerWithEmailAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(registerWithEmailAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.token=action?.payload?.token;
          state.isAuthenticated=true;  
          state.userId = action?.payload?.user?._id;
          Cookies.set("token", state.token, {
            expires: 1
          });
          Cookies.set("userId", state.userId, { expires: 1 });
          Cookies.remove("guestId");
         
        });
        builder.addCase(registerWithEmailAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
        builder.addCase(getUserAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getUserAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.user=action.payload
         
         
        });
        builder.addCase(getUserAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
        
       
  },
});


export const {logout}=authSlice.actions;
export default authSlice.reducer;

