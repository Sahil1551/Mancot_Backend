const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: "dtbqj0ymg",
    api_key : "496811871766255",
    api_secret : "9ZC9U6ppjmLEXsnKCESdMf1BlCk"
})

router.post('/upload', (req,res)=> {
    try{
        if(!req.files || Object.keys(req.files).length ===0)
         return res.status(400).send({msg: "No file were uploaded"})
        console.log(req.files)

        const file = req.files.file;
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"Size too large"})
        } 

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
        {
        removeTmp(file.tempFilePath)
        return res.status(400).json({msg:"File format is incorrect"})
        }

         cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},async(err,result) => {
            if(err) throw err;

            removeTmp(file.tempFilePath)

            return res.json({public_id:result.public_id,url:result.secure_url})
         })
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
})
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};
module.exports=router;