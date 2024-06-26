const Products = require('../models/products');
const Category = require('../models/category');
const Review = require('../models/review');
class Apifeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filtering(){
        const queryObj= {...this.queryString}
        const excludedFields=['page','sort','filter']
        excludedFields.forEach(el=>delete(queryObj[el]))
        let queryStr=JSON.stringify(queryObj)
        
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log("Sort by:", sortBy); // Debugging log
            this.query = this.query.sort(sortBy);
        } else {
            console.log("Default sort by: -createdAt"); // Debugging log
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    pagination(){
        const page = this.queryString.page * 1 || 1;

        const limit =  this.queryString.limit * 1 || 9;

        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    
    }
}

const productController = {
    postProduct: async (req, res) => {
        try {
            const { name, description, price, images, category ,news} = req.body;

            // Validate input fields
            if (!name || !description || !price || !images||!news) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            // Find the category by name or identifier
            const ifCategory = await Category.findOne({ category });
            if (!ifCategory) {
                return res.status(400).json({ msg: "Category does not exist" });
            }

            // Create new product with associated category
            const newProduct = new Products({
                name,
                description,
                price,
                images,
                category: ifCategory._id,
                news
            });

            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProductById:async(req,res)=>{
        try{
            const {id}=req.params
            const findProduct=await Products.findById(id);
            if(!findProduct){
                return res.status(400).json({msg:"Product can't be found"})
            }
            const features=new Apifeatures(Products.find({_id:findProduct._id}),req.query).filtering().sorting().pagination()
            const product=await features.query;
            
            return res.json(product)

        }
        catch(err){

        }
    },

    getProducts: async (req, res) => {
        try {
            console.log(req.query)
            const features = new Apifeatures(Products.find(),req.query).filtering().sorting().pagination()
            const product = await features.query

            return res.json({status:'success',
            result: product.length,
            Products:product})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProductsByCategory:async(req,res)=>{
        try{
            const {category}=req.params;
            const ifCategory = await Category.findOne({ category });
                if (!ifCategory) {
                    return res.status(400).json({ msg: "Category does not exist" });
                }
            const features=new Apifeatures(Products.find({category:ifCategory}),req.query).filtering().sorting().pagination()
            const product=await features.query;
            return res.json({
                status: 'success',
                result: product.length,
                Products: product
            });
        }
        catch(err){
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = productController;
