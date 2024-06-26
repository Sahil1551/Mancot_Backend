const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const userControl = {
    getInfo:async(req,res)=>{
        try{
            const user=await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:"user not found"});
            res.json(user);
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }

    },
    register: async (req, res) => {
        try {
            const { name, email, Mobile, password } = req.body;

            // Validate input
            if (!name || !email || !Mobile || !password) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            if (password.length < 8) {
                return res.status(400).json({ msg: "Password length should be greater than 8 characters" });
            }

            if (Mobile.toString().length !== 10) {
                return res.status(400).json({ msg: "Mobile number length should be equal to 10 digits" });
            }

            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email already registered" });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user instance
            const newUser = new User({
                name,
                email,
                Mobile,
                password: passwordHash
            });

            // Save the new user to the database
            await newUser.save();
            const accesstoken=Createaccesstoken({id:newUser._id});
            const refreshtoken=Createrefreshtoken({id:newUser._id});
            res.cookie('refrestoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'

            })
            // Send success response
            return res.status(201).json({accesstoken, msg: "User registered successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login:async(req,res)=>{
        try{
            const{ email,password}=req.body;
            const user= await User.findOne({email});
            if(!user) return res.status(400).json({msg:"User not exist"});
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return  res.status(400).json({msg:"Password incorrect"});
            }
            const accesstoken=Createaccesstoken({id:user._id});
            const refreshtoken=Createrefreshtoken({id:user._id});
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })
            res.json({accesstoken});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
   
        },
    refreshtoken:async(req,res)=>{
        const rf_token=req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({msg:"Please Login or Register"})
        jwt.verify(rf_token,process.env.REFRESH_TOKEN,(err,user)=>{
            const accesstoken=Createaccesstoken({id:user.id});
                res.json({user,accesstoken});
        })
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refresh_token',{path:'/user/refresh_token'});
            return res.json({msg:"Logout"});
        }
        catch{

        }
    }
    
};
const Createaccesstoken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'1d'})        
}

const Createrefreshtoken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'7d'})        
}

module.exports = userControl;
