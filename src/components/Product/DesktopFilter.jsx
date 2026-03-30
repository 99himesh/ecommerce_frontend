

import { useState } from "react";

const DesktopFilter = ({ setFilterOpen, filterOpen,setFilter ,filter}) => {
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const brands = [
    "FitGear",
    "Classic Wear",
    "Beach Breeze",
    "Urban Style",
    "OfficePro",
    "Fashion Hub",
  ];
    const material = [
    "Denim",
    "Cotton",
    "Fleece",
    "Rayon",
    "Silk",
    "Cotton Silk",
  ];

  const [price, setPrice] = useState(50);

    const sizeHandler=(e)=>{
      const {value,checked}=e.target;
      if(checked){
          setFilter({...filter,size:[...filter?.size,value]});              
      }else{
          setFilter({...filter,size: filter.size.filter((s) => s !== value)});                 
      }

    }
    const brandHandler=(e)=>{
  const {value,checked}=e.target;
  if(checked){
       setFilter({...filter,brand:[...filter?.brand,value]});              
  }else{
       setFilter({...filter,brand: filter.brand.filter((s) => s !== value)});                 
  }

}
const MaterialHandler=(e)=>{
  const {value,checked}=e.target;
  if(checked){
       setFilter({...filter,material:[...filter?.material,value]});              
  }else{
       setFilter({...filter,material: filter.material.filter((s) => s !== value)});                 
  }

}
  
  return (
    <>
    
      {/* Sidebar */}
      <div
        className={`max-sm:hidden w-xxl  h-full bg-white shadow-lg  flex flex-col
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Filter</h2>
         
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-6">

          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <label className="flex items-center gap-2 mb-1">
              <input onChange={(e)=>setFilter({...filter,category:"Topwear"})} value={filter?.category}  type="radio" name="category" /> Top Wear
            </label>
            <label className="flex items-center gap-2">
              <input onChange={(e)=>setFilter({...filter,category:"Bottomwear"})} value={filter?.category}  type="radio" name="category" /> Bottom Wear
            </label>
          </div>

          {/* Gender */}
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            <label className="flex items-center gap-2 mb-1">
              <input onChange={(e)=>setFilter({...filter,gender:"Men"})} value={filter?.gender}  type="radio" name="gender" /> Men
            </label>
            <label className="flex items-center gap-2">
              <input onChange={(e)=>setFilter({...filter,gender:"Women"})} value={filter?.gender}  type="radio" name="gender" /> Women
            </label>
          </div>

          {/* Color */}
          <div>
            <h3 className="font-semibold mb-3">Color</h3>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((color, i) => (
                <button
                  onClick={()=>{setFilter({...filter,color:color})}}
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

            {sizes?.map((item) => (
              <label key={item} className="flex items-center gap-2 mb-1">
                <input  onChange={(e) => sizeHandler(e)}  value={item} type="checkbox" />
                {item}
              </label>
            ))}
          </div>

  {/* Material */}
          <div>
            <h3 className="font-semibold mb-2">Material</h3>

            {material.map((item) => (
              <label key={item} className="flex items-center gap-2 mb-1">
                <input onChange={(e) => MaterialHandler(e)}  value={item} type="checkbox" />
                {item}
              </label>
            ))}
          </div>
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-2">Brand</h3>

            {brands?.map((item) => (
              <label key={item} className="flex items-center gap-2 mb-1">
                <input  onChange={(e) => brandHandler(e)}  value={item} type="checkbox" />
                {item}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>

            <input
              type="range"
              min="0"
              max="10000"
              value={filter.maxPrice}
              onChange={(e) => setFilter({...filter,maxPrice:e.target.value})}
              className="w-full"
            />

            <div className="flex justify-between text-sm mt-1">
              <span>$0</span>
              <span>${filter.maxPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopFilter;