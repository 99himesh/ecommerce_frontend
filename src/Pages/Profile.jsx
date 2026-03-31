import { useDispatch, useSelector } from "react-redux";
import MyOrderPage from "./MyOrderPage";
import { getUserAsync, logout } from "../feature/authSlice";
import { useNavigate } from "react-router";
import { resetOrderHandler } from "../feature/orderSlice";
import { cartResetHandler } from "../feature/cartSlice";


const Profile = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
 console.log(user,"user");
 
 const logoutHandler=async()=>{
   dispatch(logout());
   dispatch(resetOrderHandler())
   dispatch(cartResetHandler())
   navigate("/login");



 }




  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Left Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-xl font-semibold mb-1">{user?.user?.name}</h2>
        <p className="text-gray-500 mb-4">{user?.user?.email}</p>

        <button onClick={()=>{logoutHandler()}} className="w-full bg-primary text-white py-2 rounded hover:bg-primary">
          Logout
        </button>
      </div>

      {/* Right Orders Section */}
      <MyOrderPage/>

    </div>
  );
};

export default Profile;