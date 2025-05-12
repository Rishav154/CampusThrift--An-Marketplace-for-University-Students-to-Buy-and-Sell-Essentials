const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    getOrderByUserId,
    getAllOrders,
    updateOrderStatus,
    createCODOrder
} = require("../controllers/orderController");

router.get("/get-orders-by-user-id", verifyToken, getOrderByUserId)

router.get("/get-all-orders", verifyToken, getAllOrders)

router.put("/update-order-status/:paymentId", verifyToken, updateOrderStatus)

router.post("/create-cod-order", verifyToken, createCODOrder)

module.exports = router;