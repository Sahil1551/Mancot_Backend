const Category=require('../models/category')
const router=require('express').Router()
router.post('/category',async(req,res)=>{
    try{
    const {category}=req.body
    const ifcategory=await Category.findOne({category})
    if(ifcategory){
        return res.status(400).json({msg:"Category Already There"})
    }
    const newCategory=new Category({
        category
    })
    await newCategory.save()
    return res.status(201).json({ msg: "Category Created", category: newCategory });
    
}
    catch(err){
        return res.status(500).json({msg:err.message})
    }
})
router.get('/category',async(req,res)=>{
    try{
        const response=await Category.find();
        if(!response) return res.status(401).json({msg:"Error While fetching category"})
        return res.json(response);
    }
    catch(err){

    }
})
module.exports=router