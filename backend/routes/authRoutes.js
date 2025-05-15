const router = require("express").Router();
const {
    signup,
    login,
    completeProfile,
    googleOAuthStart,
    googleOAuthCallback
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signup", signup);

router.post("/login", login);

router.patch("/complete-profile", verifyToken, completeProfile);

router.get("/complete-profile", verifyToken, completeProfile);

router.get("/google", googleOAuthStart);

router.get("/google/callback", googleOAuthCallback);

module.exports = router;
