const express=require('express')
const Router=express.Router();
const productController=require('../controller/productController')
Router.route('/products')
.get(productController.getProducts)
.post(productController.postProduct)
Router.get('/products/category/:category', productController.getProductsByCategory);
Router.get('/products/:id',productController.getProductById)
module.exports=Router;