import { useDispatch, useSelector } from "react-redux";
import { getOrderAsync } from "../feature/orderSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Empty } from "antd";

const MyOrderPage=()=>{
  const token=Cookies.get("token");
  const userId=Cookies.get("userId")
  const {order}=useSelector(state=>state?.order)
  
  const dispatch=useDispatch();
   
  const getMyOrder=async()=>{
    try {
      const res=await dispatch(getOrderAsync({token})).unwrap();
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(userId){
    getMyOrder();

    }
  },[])
    return(
        <>
        <div className="md:col-span-2 py-5 min-h-[60vh]">
          <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Shipping Address</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {order?.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={item?.checkoutItems?.[0]?.image}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{item?._id}</td>
                  <td className="p-3">{item?.createdAt}</td>
                  <td className="p-3">{item?.shippingAddress?.address}</td>
                  <td className="p-3">{item?.phoneNumber}</td>
                  <td className="p-3">Rs. {item?.totalPrice}</td>
                  <td className="p-3">{item?.status}</td>
                </tr>
              ))}
            </tbody>

          </table>
         {!order.length && <Empty/>}

        </div>
      </div>
      </div>
        </>
    )
}
export default MyOrderPage;