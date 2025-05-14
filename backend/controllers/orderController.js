const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product"); // Assuming you have a Product model

const getOrderByUserId = async (req, res) => {
    const userId = req.id;

    try {
        const orders = await Order.find({userId}).populate({
            path: "products.id",
            select: "name price category images",
        });
        if (!orders) {
            return res.status(500).json({message: "No orders found"});
        }
        res.status(200).json({success: true, data: orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllOrders = async (req, res) => {
    const {page, limit} = req.query;
    const sellerId = req.id;

    try {
        const orders = await Order.find({
            "products.id": {
                $in: await Product.find({seller: sellerId}).select('_id')
            }
        })
            .populate({
                path: "products.id",
                select: "name price category images seller"
            })
            .populate({
                path: "userId",
                select: "name email"
            })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({createdAt: -1});

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                totalPages: 0,
                currentPage: Number(page),
            });
        }

        const filteredOrders = orders.map(order => {
            const orderObj = order.toObject();

            orderObj.products = orderObj.products.filter(product =>
                product.id && product.id.seller &&
                product.id.seller.toString() === sellerId.toString()
            );

            return orderObj;
        }).filter(order => order.products.length > 0);

        const count = filteredOrders.length;

        return res.status(200).json({
            success: true,
            data: filteredOrders,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
        });

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const updateOrderStatus = async (req, res) => {
    const {paymentId} = req.params;
    const {status} = req.body;

    try {
        const order = await Order.findOneAndUpdate(
            {razorpayPaymentId: paymentId},
            {status},
            {new: true}
        )
        if (!order) {
            return res.status(404).json({success: false, message: "Order not found"});
        }
        res.status(200).json({success: true, data: order, message: "Order status updated"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const createCODOrder = async (req, res) => {
    try {
        const {products, name, email, phone, address, amount} = req.body;
        const userId = req.id;

        if (!products || !products.length) {
            return res.status(400).json({
                success: false,
                message: "At least one product is required"
            });
        }

        const productValidation = await Promise.all(
            products.map(async (productItem) => {
                const product = await Product.findById(productItem.id);
                if (!product) {
                    return false;
                }
                return true;
            })
        );

        if (productValidation.some(valid => !valid)) {
            return res.status(400).json({
                success: false,
                message: "One or more products do not exist"
            });
        }

        const newOrder = new Order({
            name,
            email,
            phone: parseInt(phone.replace(/\D/g, '')),
            address,
            amount,
            products,
            userId,
            razorpayOrderId: 'COD-' + Date.now(),
            razorpayPaymentId: 'COD-' + Math.random().toString(36).substring(2, 15),
            razorpaySignature: 'COD-SIGNATURE',
            status: 'pending'
        });

        await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "COD Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error('Error creating COD order:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating COD order',
            error: error.message
        });
    }
}

module.exports = {
    getOrderByUserId,
    getAllOrders,
    updateOrderStatus,
    createCODOrder
}