const router = require("express").Router()
const Category = require("../models/category")

router.post("/category", async (req,res)=>{
    
    try {
        
        let category = new Category()
        category.title = req.body.title
        category.subCategory = req.body.subCategory

        await category.save()

        res.status(201).json({
            success:true,
            message:"category is saved successfully",
            category:category
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })

    }

})

router.get("/category", async (req,res)=>{

    try {

        let category = await Category.find({})
        res.send(category)

    } catch (error) {
    
        res.status(500).json({
            success:false,
            message:error.message
    
        })
    
    }
})

router.post("/category/:id", async (req,res)=>{
   
    try {
        
        let category = await Category.findOne({_id:req.params.id})
        console.log(category)
        console.log(req.body)
        category.subCategory.push(req.body.subCategory)
        category.save()
        res.json({
            success:true,
            message:"subCategory is updated...",
        })

    } catch (error) {
   
        res.status(500).json({
            success:false,
            message:error.message
   
        })
    }

})

router.delete("/category/:id", async (req,res)=>{
    
    try {
    
        await Category.findOneAndDelete({_id:req.params.id})
        
        res.json({
            success:true,
            message:"Main category deleted..."
        })

    } catch (error) {
        
        res.status(500).json({
            success:false,
            message: error.message
        })

    }

})

router.put("/category/:id", async (req,res)=>{

    try {
        
        let category = await Category.updateOne({"_id":req.params.id}, {$pull: {"subCategory":req.body.subCategory}})

        res.json({
            success:true,
            updatedCategory: category,
            message:"Category updated..."
        })

    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })

    }

})

module.exports = router