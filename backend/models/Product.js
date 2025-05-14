const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
    },
    category: {
        type: String,
        enum: [
            "Textbooks",
            "Electronics",
            "Furniture",
            "Clothing",
            "Stationary",
            "Sports & Fitness Gear",
            "Dorm & Apartment Essentials",
            "Others"
        ],
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
