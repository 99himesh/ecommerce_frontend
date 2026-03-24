

import { useState } from "react";

const FilterSidebar = ({ setFilterOpen, filterOpen }) => {
  const colors = [
    "red",
    "blue",
    "black",
    "green",
    "yellow",
    "gray",
    "white",
    "pink",
    "beige",
    "navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const [price, setPrice] = useState(50);

  return (
    <>
      {/* Overlay */}
      {filterOpen && (
        <div
          onClick={() => setFilterOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-[28rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50
        ${filterOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button
            onClick={() => setFilterOpen(false)}
            className="text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-6">

          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <label className="flex items-center gap-2 mb-1">
              <input type="radio" name="category" /> Top Wear
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="category" /> Bottom Wear
            </label>
          </div>

          {/* Gender */}
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            <label className="flex items-center gap-2 mb-1">
              <input type="radio" name="gender" /> Men
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" /> Women
            </label>
          </div>

          {/* Color */}
          <div>
            <h3 className="font-semibold mb-3">Color</h3>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((color, i) => (
                <button
                  key={i}
                  className="w-7 h-7 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>

            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2 mb-1">
                <input type="checkbox" />
                {size}
              </label>
            ))}
          </div>

          {/* Material */}
          <div>
            <h3 className="font-semibold mb-2">Material</h3>

            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2 mb-1">
                <input type="checkbox" />
                {size}
              </label>
            ))}
          </div>

          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-2">Brand</h3>

            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 mb-1">
                <input type="checkbox" />
                {brand}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>

            <input
              type="range"
              min="0"
              max="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />

            <div className="flex justify-between text-sm mt-1">
              <span>$0</span>
              <span>${price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;