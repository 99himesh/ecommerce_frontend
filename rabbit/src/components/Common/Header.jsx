import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import Topbar from "../Layout/Topbar";

const Header=()=>{
    return(
        <header className="border-b border-gray-200">
        {/* topbar */}
        <Topbar/>
        {/* Navbar */}
        <Navbar/>
        </header>
    )
}
export default Header;