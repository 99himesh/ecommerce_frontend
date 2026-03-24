import { Route, Routes } from "react-router"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./Pages/Home"
import { Toaster } from 'sonner'
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import CollectionPage from "./Pages/CollectionPage"
import ProductDetails from "./components/Product/ProductDetails"
import Checkout from "./components/Cart/Checkout"
function App() {

  return (
    <>
     <Toaster position="top-right"/>

   <Routes>
    {/* user Layout */}
    <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="collections/:collection" element={<CollectionPage/>}/>
      <Route path="product/:id" element={<ProductDetails/>}/>
      <Route path="checkout" element={<Checkout/>}/>
    
    </Route>
    {/* Admin Layout */}

    <Route></Route>

   </Routes>
    </>
  )
}

export default App
