import { FaFilter } from "react-icons/fa6";
import { useParams } from "react-router";
import FilterSidebar from "../components/Product/FilterSidebar";
import { useEffect, useState } from "react";
import DesktopFilter from "../components/Product/DesktopFilter";
import Collection from "../components/Product/Collection";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync } from "../feature/productSlice";
import { Row,Col } from "antd";

const CollectionPage=()=>{
    const {collection}=useParams();
    const dispatch=useDispatch();
    const {products}=useSelector(state=>state.product);
     const data={};
    const [filterOpen,setFilterOpen]=useState(false);
    const [filter,setFilter]=useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:10000
    })
    
    switch (collection) {
        case "Men":
            data.gender=collection
            break;

        case "Women":
            data.gender=collection
            break;

        case "Topwear":
            data.collection=collection
            break;

        case "BottomWear":
                data.collection=collection
            break;

     }
    if(filter?.category) data.category=filter?.category;
    if(filter?.gender) data.gender=filter?.gender;
    if(filter?.color) data.color=filter?.color;
    if(filter?.size.length) data.size=filter?.size.join(",");
    if(filter?.material.length) data.material=filter?.material.join(",");
    if(filter?.brand.length) data.brand=filter?.brand.join(",");
    if(filter?.minPrice) data.minPrice=filter?.minPrice;
    if(filter?.maxPrice) data.maxPrice=filter?.maxPrice;


    const getProducts=async()=>{
        try {
            const res=await dispatch(getProductAsync({data})).unwrap();
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
         getProducts()
    },[collection,filter])
    return(
        <div className="flex flex-col  md:px-4 px-2">
            {/* Mobile filter button */}
            <button onClick={()=>{setFilterOpen(true)}} className="sm:hidden border  p-2 flex justify-center items-center">
                <FaFilter className="mr-2"/>
            </button>

            {/* filter sidebar mobile */}
            <div>
                <FilterSidebar filter={filter} setFilter={setFilter} setFilterOpen={setFilterOpen} filterOpen={filterOpen}/>
            </div>


          
            <Row gutter={[20,20]}>
                <Col xxl={4} xl={4} md={4} sm={24} xs={24} >
                  <DesktopFilter filter={filter} setFilter={setFilter}/>
                </Col>
                <Col xxl={20} xl={20} md={20} sm={24} xs={24}>
                  <Collection products={products}/>
                </Col>
            </Row>
        </div>
    )
}
export default CollectionPage;