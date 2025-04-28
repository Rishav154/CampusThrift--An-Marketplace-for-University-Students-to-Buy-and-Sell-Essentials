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
        category: {
            type: String,
            required: true,
        },
        imgaes: {
            type: Array,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    }, {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;