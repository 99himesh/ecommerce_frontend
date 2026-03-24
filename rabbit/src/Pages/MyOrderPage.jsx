const MyOrderPage=()=>{
     const orders = [
    {
      id: "#12345",
      image: "https://picsum.photos/200/300",
      date: "07/12/2024 16:33:37",
      address: "Lucknow, India",
      items: 2,
      price: "$120",
      status: "Delivered",
    },
    {
      id: "#34567",
      image: "https://picsum.photos/200/300",
      date: "07/12/2024 16:33:37",
      address: "Delhi, India",
      items: 1,
      price: "$60",
      status: "Processing",
    },
  ];
    return(
        <>
        <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Shipping Address</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={order.image}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.items}</td>
                  <td className="p-3">{order.price}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
        </>
    )
}
export default MyOrderPage;