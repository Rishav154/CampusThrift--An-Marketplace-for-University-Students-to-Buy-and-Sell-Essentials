const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/User");
const slugify = require("slugify");


const createProduct = async (req, res) => {
    try {
        const {
            name,
            shortDescription,
            price,
            description,
            color,
            category
        } = req.body;

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
            shortDescription,
            price,
            description,
            color,
            category,
            images: uploadedImages,
            seller: req.user._id,
        });

        await product.save();

        const baseSlug = slugify(name, {lower: true, strict: true});
        product.slug = `${baseSlug}-${product._id.toString().slice(-5)}`;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product listed successfully",
            data: product,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getProductBySlug = async (req, res) => {
    const {slug} = req.params;
    try {
        const product = await Product.findOne({slug}).populate("seller", "fullname createdAt");

        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Product found",
            data: product,
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
};

const getSellerById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("fullname email phone university course createdAt");
        if (!user) {
            return res.status(404).json({success: false, message: "Seller not found"});
        }
        res.status(200).json({success: true, data: user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;

        const product = await Product.findByIdAndUpdate(id, data, {new: true});
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
};

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
};

const getProducts = async (req, res) => {
    try {
        let {page, limit, category, price, search} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;

        let query = {blacklisted: false};

        if (category && category !== "all") {
            query.category = category.charAt(0).toUpperCase() + category.slice(1);
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
            .select("name slug price shortDescription images description color category blacklisted")
            .limit(limit)
            .skip((page - 1) * limit);

        const newProductsArray = products.map(product => {
            const productObj = product.toObject();
            productObj.image = productObj.images[0];
            delete productObj.images;
            return productObj;
        });

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
};

const getProductByName = async (req, res) => {
    const {name} = req.params;
    try {
        const searchPattern = name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => `(?=.*${word})`)
            .join('');

        const product = await Product.findOne({
            name: {$regex: new RegExp(searchPattern, "i")}
        }).populate("seller", "fullname createdAt");

        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({success: true, message: "Product found", data: product});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
};

const getMyProducts = async (req, res) => {
    try {
        let {page, limit, category, price, search} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 9;

        let query = {seller: req.user._id};

        if (category && category !== "all") {
            query.category = category.charAt(0).toUpperCase() + category.slice(1);
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
            .select("name price shortDescription images description color category blacklisted")
            .limit(limit)
            .skip((page - 1) * limit);

        const newProductsArray = products.map(product => {
            const productObj = product.toObject();
            productObj.image = productObj.images[0];
            delete productObj.images;
            return productObj;
        });

        return res.status(200).json({
            success: true,
            message: "Your products fetched successfully",
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
};

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
};

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
};

module.exports = {
    createProduct,
    getProductBySlug,
    getSellerById,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByName,
    getMyProducts,
    blacklistProduct,
    removeBlacklistProduct,
};
