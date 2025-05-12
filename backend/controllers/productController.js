const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
    try {
        const {name, price, description, color, category} = req.body;

        const uploadedImages = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "products",
            });

            uploadedImages.push({
                url: result.secure_url,
                id: result.public_id,
            });
        }

        const product = new Product({
            name,
            price,
            description,
            color,
            category,
            images: uploadedImages,
        })

        await product.save();
        return res.status(200).json({success: true, message: "Product listed successfully", data: product});

    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, data, {new: true});
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({success: true, message: "Product updated successfully", data: product});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const getProducts = async (req, res) => {
    try {
        let {page, limit, category, price, search} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 9;

        let query = {};

        if (category) {
            query.category = category.charAt(0).toUpperCase() + category.slice(1);
        }
        if (category === "all") {
            delete query.category;
        }
        if (search) {
            query.name = {$regex: search, $options: "i"};
        }

        if (price > 0) {
            query.price = {$lte: price};
        }
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const products = await Product.find(query)
            .select("name price images description color category blacklisted")
            .limit(limit)
            .skip((page - 1) * limit)

        let newProductsArray = [];
        products.forEach((product) => {
            const productObj = product.toObject();
            productObj.image = productObj.images[0];
            delete productObj.images;
            newProductsArray.push(productObj);
        })

        if (!products) {
            return res.status(404).json({success: false, message: "No products found"});
        }
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: newProductsArray,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const getProductByName = async (req, res) => {
    const {name} = req.params;
    try {
        const product = await Product.findOne({
            name: {
                $regex: new RegExp(name, "i"),
            }
        })
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        return res.status(200).json({success: true, message: "Product found", data: product});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const blacklistProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, {blacklisted: true}, {new: true});
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        return res.status(200).json({
            success: true,
            message: `Product ${product.name} has been blacklisted`,
            data: product
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const removeBlacklistProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, {blacklisted: false}, {new: true});
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        return res.status(200).json({
            success: true,
            message: `Product ${product.name} has been removed from blacklist`,
            data: product
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByName,
    blacklistProduct,
    removeBlacklistProduct
};