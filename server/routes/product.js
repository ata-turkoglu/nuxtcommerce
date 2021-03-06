const router = require("express").Router();
const Product = require("../models/product");


router.post("/product", async (req,res)=>{
    try{

        if(req.body.multiData){
            Product.insertMany(req.body.multiData, (err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.json({
                        success:true,
                        message:"products are saved successfully...",
                        products:req.body.multiData
                    })
                }
            })
        }else{
            let product = new Product()
            product.title = req.body.title
            product.price = req.body.price
            product.stockNumber = req.body.stockNumber
            product.summary = req.body.summary
            product.features = req.body.features
            product.description = req.body.description
            product.photo = req.body.photo
            product.mainCategory = req.body.mainCategory
            product.subCategory = req.body.subCategory
    
            await product.save()
    
            res.json({
                success:true,
                message:"product is saved successfully...",
                product:product
            })
        }

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
})

router.get("/product/:id", async (req,res)=>{
    try {
        
        let product = await Product.findOne({_id:req.params.id}).exec()

        res.json({
            success:true,
            product:product
        })

    } catch (error) {
        res.json({
            success:success,
            message:error.message
        })
    }
})

router.put("/product/:id", async(req,res)=>{
    try {
        let product = await Product.findOneAndUpdate({_id:req.params.id},{
            $set:{
                title : req.body.title,
                price : req.body.price,
                stockNumber : req.body.stockNumber,
                summary : req.body.summary,
                features : req.body.features,
                description : req.body.description,
                photo : req.body.photo,
                mainCategory : req.body.mainCategory,
                subCategory : req.body.subCategory,
            }
        },{upsert:true, new:true})
        
        res.json({
            success:true,
            product_update:product
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
})

router.delete("/product/:id", async (req,res)=>{
    try {
        
        let product = await Product.findOneAndDelete({_id:req.params.id})

        res.json({
            success:true,
            product:product
        })

    } catch (error) {

        res.status(500).json({
            success:true,
            message:error.message
        })
        
    }
})

module.exports = router