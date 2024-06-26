const mongoose=require('mongoose')
const Checkout=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart',
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
    Mobile : {
        type:Number,
        require:true
    },
    PinCode :{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Total:{
        type:Number,
        require:true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        price: Number
    }],
    paymentStatus:{
        type: String,
        enum: ['Pending', 'Paid', 'Failed'], 
        default: 'Pending'
    },
    razorpayid:{
        type:String,
        default:null
    },
    razorpaypaymentid:{
        
        type:String,
        
        default:null
    }

},{
    timestamps:true
})
module.exports=mongoose.model('CheckoutModel',Checkout)