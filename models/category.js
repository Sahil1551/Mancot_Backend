const mongoose=require('mongoose')
const category=mongoose.Schema({
    category:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})
module.exports=mongoose.model('category',category)