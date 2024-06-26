const CheckoutModel=require('../models/Checkout')
const Router=require('express').Router()
const RazorPay=require('razorpay') 
const cartModel=require('../models/cart')
const { setStatus } = require('../status');
const instance=new RazorPay({
    key_id:process.env.RAZOR_PAY_API_KEY,
    key_secret:process.env.RAZOR_PAY_API_SECRET
  
  })
  
Router.post('/CheckOutdetails',async(req,res)=>{
    try{
        const {userId,cart,name, email, mobile, pincode, address, price } = req.body;
        if(!userId||!cart||!name||!email||!mobile||!pincode||!address||!price){
            return res.status(400).json({msg:"All Fields Are Required"})
        }        
        if (mobile.toString().length !== 10) {
            return res.status(400).json({ msg: "Mobile number length should be equal to 10 digits" });
        }
        const crt=await cartModel.findOne({_id:cart})
        const products = crt.products.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price
        }));

        const newData = new CheckoutModel({
            userId,
            cart,
            name,
            email,
            Mobile: mobile,
            Pincode: pincode,
            Address: address,
            Total: price,
            products: products, // Save populated products
        });
        await newData.save()
        setStatus(newData._id)
        const option={
            amount:Number(price*100),
            currency:'INR'
        }
        const order=await instance.orders.create(option)

        return res.status(201).json(order)
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }   
})
Router.get('/CheckoutDetial/:id',async(req,res)=>{
    const{id}=req.params;
    const ifcheckout= await CheckoutModel.findById(id);
    if(!ifcheckout){
        return res.status(400).json({msg:"Checkout Details Not Available"})

    }
    else{
        return res.status(201).json(ifcheckout)
    }
})
module.exports=Router