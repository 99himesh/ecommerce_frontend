import MyOrderPage from "./MyOrderPage";


const Profile = () => {
 

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Left Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-xl font-semibold mb-1">John Doe</h2>
        <p className="text-gray-500 mb-4">John@example.com</p>

        <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Right Orders Section */}
      <MyOrderPage/>

    </div>
  );
};

export default Profile;