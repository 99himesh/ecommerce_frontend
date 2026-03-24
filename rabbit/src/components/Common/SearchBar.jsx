import React from 'react'
import { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
const  SearchBar=()=> {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?"absolute top-0 left-0 bg-white h-24 z-50":"w-auto"}`}>
      {isOpen?(
        <form className='relative flex justify-center items-center w-full'>
          <div className='relative w-1/2'>
          <input
           type='text'
           placeholder='Search'
           className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-400'
           />
             <button 
          className='absolute top-0 right-2 top-2 cursor-pointer '
         >
          <HiMagnifyingGlass className="h-6 w-6"/>
        </button>
          </div>
          <button 
          className='absolute top-0 right-2 top-2 cursor-pointer '
          onClick={()=>{setIsOpen(false)}}>
          <HiMiniXMark className="h-6 w-6"/>
        </button>
         
        </form>
      ):(
       <>
        <button 
        className='cursor-pointer'
          onClick={()=>{setIsOpen(true)}}>
          <HiMagnifyingGlass className="h-6 w-6"/>
        </button>
       </>
      )}
    </div>
  )
}

export default SearchBar
