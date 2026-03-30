import { Outlet } from "react-router";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
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
