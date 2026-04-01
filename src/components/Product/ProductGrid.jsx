import { Link } from "react-router";



const ProductGrid = ({similerProducts}) => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8">

    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {similerProducts?.map((product) => (
          <Link to={`/product/${product?._id}`} key={product.id} className="cursor-pointer">

            {/* Image */}
            <img
              src={product?.images[0]?.url}
              alt={product?.name}
              className="w-full h-72 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="mt-3">

              <h3 className="text-sm font-medium">
                {product?.name}
              </h3>

              <p className="text-gray-600 text-sm">
                {product?.price}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
};

export default ProductGrid;