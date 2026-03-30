import { Link } from "react-router";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Link to={`/product/${product?._id}`}>
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      
      {/* 🔹 Image */}
      <div className="w-full h-52 bg-gray-100">
        <img
          src={product?.images?.[0]?.url}
          alt={product?.images?.[0]?.altText}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 Info */}
      <div className="p-4">
        
        {/* Name */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {product?.name}
        </h2>

        {/* Category */}
        <p className="text-xs text-gray-500 mt-1">
          {product?.category}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-[#214344]">
            ₹{product?.discountPrice}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{product?.price}
          </span>
        </div>

        {/* Discount Badge */}
        <p className="text-xs text-green-600 mt-1">
          {Math.round(
            ((product?.price - product?.discountPrice) / product?.price) * 100
          )}
          % OFF
        </p>

        {/* Stock */}
        <p className="text-xs text-gray-500 mt-1">
          {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>

       
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;