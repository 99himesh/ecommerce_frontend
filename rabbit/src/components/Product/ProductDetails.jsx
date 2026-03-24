import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
// import { toast } from "sonner";

const product = {
  name: "Slim-Fit Easy-Iron Shirt",
  price: 34.99,
  description:
    "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette.",
  brand: "Urban Chic",
  material: "Cotton",
  colors: ["#d1d5db", "#374151"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  ]
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="py-10 ">
    <h3 className="text-center font-semibold text-3xl"> Best Seller</h3>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="flex  max-sm:flex-col  gap-4">
          
          {/* thumbnails */}
          <div className="flex flex-col max-sm:flex-row gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setMainImage(img)}
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
            {product.name}
          </h2>

          <p className="text-lg text-gray-700 mb-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* COLORS */}
          <div className="mb-4">
            <p className="font-medium mb-2">Color:</p>
            <div className="flex gap-3">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-4">
            <p className="font-medium mb-2">Size:</p>
            <div className="flex gap-3">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  className="border px-3 py-1 rounded hover:bg-black hover:text-white"
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
          <button   onClick={() => toast.success("Product added to cart")}
             className="w-full bg-black text-white py-3 rounded">
            ADD TO CART
          </button>

          {/* CHARACTERISTICS */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Characteristics:</h3>

            <div className="flex justify-between text-gray-600">
              <span>Brand</span>
              <span>{product.brand}</span>
            </div>

            <div className="flex justify-between text-gray-600 mt-2">
              <span>Material</span>
              <span>{product.material}</span>
            </div>

          </div>

        </div>
        
      </div>
       <div className="flex justify-center w-full">
              <h2 className="text-2xl text-center font-medium mb-8">
               You May Also Like
           </h2>
        </div>

            <ProductGrid/>
            
    </div>
  );
};

export default ProductDetails;