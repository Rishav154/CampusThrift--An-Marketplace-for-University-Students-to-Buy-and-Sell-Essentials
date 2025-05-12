const Order = require("../models/Order");
const User = require("../models/User");

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
    try {
        const orders = await Order.find()
            .populate({path: "products.id", select: "name price category images"}).populate({
                path: "userId",
                select: "name email",
            }).limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({createdAt: -1});

        if (!orders) {
            return res.status(404).json({success: false, message: "No orders found"});
        }

        const count = await Order.countDocuments();

        return res.status(200).json({
            success: true,
            data: orders,
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

module.exports = {
    getOrderByUserId,
    getAllOrders,
    updateOrderStatus
}

