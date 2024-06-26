const cartController=require('../controller/cartController')
const Router=require('express').Router()
Router.post('/addToCart',cartController.addToCart)
Router.get('/addToCart/:userId',cartController.getCart)
Router.delete('/DeleteCart/:id',cartController.DeleteCart)
Router.delete('/removeitem/:id',cartController.removeItem)
module.exports=Router