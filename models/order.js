const mongoose = require('mongoose');

const orderDetail = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number
    }],
    totalPrice: Number,
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'], // Example statuses you might use
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Stripe', 'Other'], // Example payment methods
        required: true
    },
    paymentDetails: {
        transactionId: String,
        amount: Number,
        currency: {
            type: String,
            default: 'USD'
        },
        // Other relevant details depending on your payment method
    },
    shippingStatus: String
});

module.exports = mongoose.model('Order', orderDetail);
