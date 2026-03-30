import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getBestSellerProductAsync, getProductDetailsAsync, getSimilerProductAsync } from "../../feature/productSlice.js";
// import { toast } from "sonner";
import Cookies from "js-cookie"
import { addToCartCartAsync, getCartAsync } from "../../feature/cartSlice.js";
const ProductDetails = () => {
  const {productDetails,similerProducts,bestSeller}=useSelector(state=>state.product);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [variant,setVariant]=useState({
    color:"",
    size:""
  })
  const {id}=useParams();
  const dispatch=useDispatch();
 const {guestId,userId}=useSelector(state=>state.auth);
  
  const products=Object.keys(productDetails).length>0?productDetails:bestSeller
  const getbestSeller=async()=>{
     try {
      const res=await dispatch(getBestSellerProductAsync()).unwrap();
           setMainImage(res?.data?.images[0]?.url);  
    } catch (error) {
      console.log(error);
    }
  }
  const getSimilerProduct=async()=>{
    try {
      const res=await dispatch(getSimilerProductAsync({id})).unwrap();      
    } catch (error) {
      console.log(error);
      
    }
  }
  const getProductDetailData=async()=>{
    try {
      const res=await dispatch(getProductDetailsAsync({id})).unwrap();
      if(res.status){
      setMainImage(res?.data?.images[0]?.url);
      getSimilerProduct();
      }
    } catch (error) {
      console.log(error);
      
    }
  }
const getCart=async()=>{
       try {
        const data={}
        if(userId){
          data.userId=userId
        }else{
          data.guestId=guestId
        }
        const res=await dispatch(getCartAsync({data})).unwrap();
        console.log(res);
        
        
       } catch (error) {
        
       }
    }


  const addToCartHandler=async()=>{
    console.log(variant);
    
      if(!variant?.color || !variant?.size || quantity==0){
     return toast.error("Please select required field")
     
      }
    try {
      const data={ 
          productId:products?._id,
          quantity:quantity,
          size:variant.size,
          color:variant.color
        }
        if(userId){
          data.userId=userId
        }else{
          data.guestId=guestId
        }
      const res=await dispatch(addToCartCartAsync({data})).unwrap();
      console.log(res);
      if(res.status){
        toast.success("Successfully add to cart")
        getCart()
      }
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{  
    if(id){
     getProductDetailData()

    }else{
       getbestSeller()

    }
  },[id]);
  return (
    <div className="py-10 ">
    {/* <h3 className="text-center font-semibold text-3xl"> Best Seller</h3> */}

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="flex  max-sm:flex-col  gap-4">
          
          {/* thumbnails */}
          <div className="flex flex-col max-sm:flex-row gap-3">
            {products?.images?.map((img, index) => (
              <img
                key={index}
                src={img?.url}
                onClick={() => setMainImage(img?.url)}
                className="w-16 h-16 object-cover border rounded cursor-pointer"
              />
            ))}
          </div>

          {/* main image */}
          <div className="flex-1">
            <img
              src={mainImage}
              className="w-full h-[650px] object-cover rounded"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>

          <h2 className="text-2xl font-semibold mb-2">
            {products?.name}
          </h2>

          <p className="text-lg text-gray-700 mb-4">
            ${products?.price}
          </p>

          <p className="text-gray-600 mb-6">
            {products?.description}
          </p>

          {/* COLORS */}
          <div className="mb-4">
            <p className="font-medium mb-2">Color:</p>
            <div className="flex gap-3">
              {products?.colors?.map((color, i) => (
                <div
                onClick={()=>{setVariant({...variant,color:color})}}
                  key={i}
                  className={`w-6 h-6 rounded-full border ${color==variant?.color && "border-4 border-gray-500"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-4">
            <p className="font-medium mb-2">Size:</p>
            <div className="flex gap-3">
              {products?.sizes?.map((size, i) => (
                <button
                onClick={()=>{setVariant({...variant,size:size})}}
                  key={i}
                  className={`border px-3 py-1 rounded hover:bg-black hover:text-white ${size==variant?.size && "bg-black text-white"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center gap-4">
              <button
                className="border px-3"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                className="border px-3"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button    onClick={() =>addToCartHandler()}
             className="w-full bg-black text-white py-3 rounded">
            ADD TO CART
          </button>

          {/* CHARACTERISTICS */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Characteristics:</h3>

            <div className="flex justify-between text-gray-600">
              <span>Brand</span>
              <span>{products?.brand}</span>
            </div>

            <div className="flex justify-between text-gray-600 mt-2">
              <span>Material</span>
              <span>{products?.material}</span>
            </div>

          </div>

        </div>
        
      </div>
       <div className="flex justify-center w-full">
              <h2 className="text-2xl text-center font-medium mb-8">
               You May Also Like
           </h2>
        </div>

            <ProductGrid  similerProducts={similerProducts}/>
            
    </div>
  );
};

export default ProductDetails;