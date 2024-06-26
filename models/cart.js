const mongoose=require('mongoose')
const cart=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    products:[{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number,
        price:Number
    }],
    totalPrice:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model('Cart',cart)