const express = require('express');
const Review = require('../models/review');
const router = express.Router();

router.post('/review', async (req, res) => {
    try {
        const { user, email, rating, comment, product } = req.body;

        // Validate input data
        if (!user || !email || !rating || !comment || !product) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        const ifExist=await Review.findOne({email})
        if(ifExist){
            return res.status(400).json({ msg: "Email already used" });
        }
        // Create and save new review
        const newReview = new Review({
            user,
            email,
            rating,
            comment,
            product
        });

        await newReview.save();

        return res.status(201).json({ msg: "Review Created", review: newReview });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
