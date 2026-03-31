import { Link } from "react-router";

const products = [
  {
    id: 1,
    name: "Mountain View Shirt",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    id: 2,
    name: "Ocean Blue Shirt",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: 3,
    name: "Wooden Style Jacket",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    id: 4,
    name: "Vintage Urban Shirt",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
  }
];

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