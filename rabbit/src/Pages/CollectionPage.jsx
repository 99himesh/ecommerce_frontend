import { FaFilter } from "react-icons/fa6";
import { useParams } from "react-router";
import FilterSidebar from "../components/Product/FilterSidebar";
import { useState } from "react";
import DesktopFilter from "../components/Product/DesktopFilter";
import Collection from "../components/Product/Collection";

const CollectionPage=()=>{
    const {collection}=useParams();
    const [filterOpen,setFilterOpen]=useState(false)
    return(
        <div className="flex flex-col lg:flex-row">
            {/* Mobile filter button */}
            <button onClick={()=>{setFilterOpen(true)}} className="sm:hidden border  p-2 flex justify-center items-center">
                <FaFilter className="mr-2"/>
            </button>

            {/* filter sidebar */}
            <div>
                <FilterSidebar setFilterOpen={setFilterOpen} filterOpen={filterOpen}/>
            </div>


            {/* deskktop  */}
            <div className="flex ">
                <DesktopFilter/>
                <Collection/>
            </div>
        </div>
    )
}
export default CollectionPage;