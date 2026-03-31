import { Outlet } from "react-router";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Cookies from "js-cookie";
import { getUserAsync } from "../../feature/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const UserLayout = () => {
  const token=Cookies.get("token");
  const dispatch=useDispatch();
   const getProfile=async()=>{
  try {
    const res=await dispatch(getUserAsync({token})).unwrap();    
  } catch (error) {
     console.log(res);
  }
 }
 useEffect(()=>{
     getProfile();
 },[token])

  return (
    <>
      {/* header */}
      {/* Main content */}
      {/* footer */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default UserLayout;
