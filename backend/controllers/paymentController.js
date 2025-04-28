const Razorpay = require('razorpay');
const User = require('../models/User');
const {validatePaymentVerification} = require('razorpay/dist/utils/razorpay-utils');
const Product = require('../models/Product');
const Order = require('../models/Order');


var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generatePayment = async (req, res) => {
    const userId = req.id;

    try {
        const {amount} = req.body;
        const options = {
            amount: amount * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            receipt: Math.random().toString(36).substring(2),
        };

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        instance.orders.create(options, async (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, message: err});
            }
            return res.status(200).json({
                success: true, data: {
                    ...order,
                    name: user.name,
                }
            });
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const verifyPayment = async (req, res) => {
    const userId = req.id;
    try {
        const {razorpay_order_id, razorpay_payment_id, amount, address, productArray} = req.body;

        const signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const validatedPayment = validatePaymentVerification({
            "order_id": razorpay_order_id,
            "payment_id": razorpay_payment_id
        }, signature, process.env.RAZORPAY_KEY_SECRET);

        if (!validatedPayment) {
            return res.status(400).json({success: false, message: 'Payment verification failed'});
        }

        for (const product of productArray) {
            await User.findByIdAndUpdate(
                {_id: userId},
                {$push: {purchasedProducts: product.id}})

            await Product.findByIdAndUpdate(
                {_id: product.id},
                {
                    $inc: {
                        stock: -product.quantity,
                    }
                }
            )
        }
        await Order.create({
            amount: amount / 100,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: signature,
            products: productArray,
            address: address,
            userId: userId
        });

        return res.status(200).json({success: true, message: "Payment Verified"});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {generatePayment, verifyPayment}