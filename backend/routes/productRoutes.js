const express=require("express");
const Product=require("../model/product");
const {protect,admin}=require("../middleware/protect") ;
const router=express.Router();


router.post("/",protect,admin,async(req,res)=>{
    
   try {
     const {
         name,
         description,
         price,
         discountPrice,
         countInStock,
         sku,
         category,
         brand,
         sizes,
         colors,
         collections,
         material,
         gender,
         images,
         isFeatured,
         isPublished,
         rating,
         numReviews,
         tags,
         metaTitle,
         metaDescription,
         metaKeywords,
         dimensions,
         weight
     }=req.body;
     const product =new Product({
         name,
         description,
         price,
         discountPrice,
         countInStock,
         sku,
         category,
         brand,
         sizes,
         colors,
         collections,
         material,
         gender,
         images,
         isFeatured,
         isPublished,
         rating,
         numReviews,
         tags,
         metaTitle,
         metaDescription,
         metaKeywords,
         dimensions,
         weight,
         user:req?.user?._id
     });
     const createProduct=await product.save();     
     res.status(201)
     .json(createProduct);
   } catch (error) {    
    res.status(500).json({message:"Internal server error",error});
   }
});


//update product

router.put("/:id",protect,admin,async(req,res)=>{    
    try {
        const {
         name,
         description,
         price,
         discountPrice,
         countInStock,
         sku,
         category,
         brand,
         sizes,
         colors,
         collections,
         material,
         gender,
         images,
         isFeatured,
         isPublished,
         rating,
         numReviews,
         tags,
         metaTitle,
         metaDescription,
         metaKeywords,
         dimensions,
         weight
     } =req.body;
     const product =await Product.findById(req.params.id);
     if(product){
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
        product.sku = sku || product.sku;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.collections = collections || product.collections;
        product.material = material || product.material;
        product.gender = gender || product.gender;
        product.images = images || product.images;
        product.isFeatured !==undefined? isFeatured : product.isFeatured;
        product.isPublished !== undefined ?isPublished: product.isPublished;
        product.rating = rating || product.rating;
        product.numReviews = numReviews || product.numReviews;
        product.tags = tags || product.tags;
        product.metaTitle = metaTitle || product.metaTitle;
        product.metaDescription = metaDescription || product.metaDescription;
        product.metaKeywords = metaKeywords || product.metaKeywords;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
        const updateProduct =await product.save();
        res.json(updateProduct);
            }else{
                res.status(404).json({message:"Product not found"})
            }
                
            } catch (error) {
                res.status(500).json("Internal server error",error.message)
            }
        })



        //delete product 

        router.delete("/:id",protect,admin,async(req,res)=>{
            try {
                const {id}=req.params;
                const product=await Product.findById(id);
                if(product){
                    await product.deleteOne();
                    res.json({message:"Product delete successfully"})
                }else{
                    res.status(404).json({message:"Product not found"})
                }
                
            } catch (error) {
               console.log(error);
               res.status(500).json({message:"Internal server error"})
                
            }
        })



     //   get product public

     router.get("/",async(req,res)=>{
       try {
         const {
             collection,
             size,
             color,
             gender,
             minPrice,
             maxPrice,
             sortBy,
             search,
             category,
             material,
             brand,
             limit
         }=req.query;
 
         let query={};
         //fileter
         if(collection && collection.toLowerCase()!=="all"){
             query.collections=collection 
         }
         if(category && category.toLowerCase()!=="all"){
             query.category=category
         }
         if(gender){
             query.gender=gender;
         }
         if(material){
             query.material={$in:material.split(",")}
         }
          if(brand){
             query.brand={$in:brand.split(",")}
         } 
         if(size){
             query.sizes={$in:size.split(",")}
         }
         if(color){
             query.colors={$in:color.split(",")}
         }
         if(minPrice || maxPrice){
             query.price={};
             if(minPrice) query.price.$gte=Number(minPrice)
             if(maxPrice) query.price.$lte=Number(maxPrice)
         }
     if(search){
         query.$or=[
             {name:{$regex:search ,$options:"i"}},
             {description:{$regex:search ,$options:"i"}},
         ]
     }
   
 
     //sort
    let sort={};
     if(sortBy){
         switch(sortBy){
             case "priceAsc":
                 sort={price:1};
                 break;
              case "priceDesc":
                 sort={price:-1};
                 break;
              case "popularity":
                 sort={rating:-1};
                 break;
             default:
                 break;
         }
     }
   
     const product=await Product.find(query)
     .sort(sort).limit(Number(limit)|| 0);
     res.status(200).json(product)
 
 
       } catch (error) {
          res.status(500).json("Internal Server error")
       }

     });


// best seller. 
  router.get("/best-seller",async(req,res)=>{
    try {
        const bestSeller=await Product.findOne().sort({rating:-1})
        
        if(bestSeller){
            res.status(200).json({data:bestSeller});
        }else{
            res.status(404).json({message:"No best seller"});
        }
    } catch (error) {
          console.log(error);
          res.status(500).json("Internal server error")
    }
  })

  //new arrival
  router.get("/new-arrival",async(req,res)=>{
        console.log("newArrival");
    try {
        const newArrival=await Product.find().sort({createdAt:-1}).limit(8);
        if(newArrival){
            res.status(200).json(newArrival)
        }else{
            res.status(404).json({message:"Data not found"})
        }
        
    } catch (error) {
        console.log(error);
        
          res.status(500).json("Internal server error",error)
    }
  })

     // get by id

     router.get("/:id",async(req,res)=>{
      try {
          const {id}=req.params;
          const product=await Product.findById(id);
          if(product){
              res.status(200).json({
                message:"Product details fetch successfully",
                data:product
            })
          }else{
            res.status(404).json({message:"Product not found"})
          }
      } catch (error) {
        res.status(500).json("Internal server error")
      }
     })



  //   get similer product 

  router.get("/similer/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        
        if(!product){
            res.status(404).json("Product not found")
        }
        const similerProduct=await Product.find({
            _id:{$ne:id},
            gender:product.gender,
            category:product.category
        }).limit(4);
        console.log(similerProduct);
        

        res.status(200).json({message:"Similer Product fetch successfully",data:similerProduct})
    } catch (error) {
        res.status(500).json("Internal server error")
    }

  })


  
    module.exports=router


