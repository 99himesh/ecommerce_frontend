import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";
import {Row,Col} from "antd"
const Collection=({products})=>{
   
    return(
        <Row gutter={[20,20]}  className="py-4 ">
        {products.map((item)=>{
            return(
                <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24} >
                <ProductCard product={item}/>
                </Col>
            )
        })}

        </Row>
    )
}
export default Collection;