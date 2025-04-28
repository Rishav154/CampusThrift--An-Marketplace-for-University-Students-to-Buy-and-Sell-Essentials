const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    razorpayPaymentId: {
        type: String,
        required: true,
    },
    razorpaySignature: {
        type: String,
        required: true,
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;