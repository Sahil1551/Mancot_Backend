const mongoose=require('mongoose')
const products=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' // Reference to Review model
    }],
    news:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
module.exports=mongoose.model('Products',products)