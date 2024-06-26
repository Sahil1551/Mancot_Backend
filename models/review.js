const mongoose=require('mongoose')
const  reviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:true   
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model('Review', reviewSchema)