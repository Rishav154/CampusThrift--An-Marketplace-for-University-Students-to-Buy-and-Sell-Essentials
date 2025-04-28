const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {changePassword, changePhone} = require("../controllers/settingController");


router.put("/change-password", verifyToken, changePassword);
router.put("/change-phone", verifyToken, changePhone);

module.exports = router;