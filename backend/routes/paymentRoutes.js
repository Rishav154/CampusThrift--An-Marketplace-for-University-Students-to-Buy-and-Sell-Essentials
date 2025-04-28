const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {generatePayment, verifyPayment} = require("../controllers/paymentController");

router.post("/generate-payment", verifyToken, generatePayment);
router.post("/verify-payment", verifyToken, verifyPayment);

module.exports = router;