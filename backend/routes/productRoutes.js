const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByName,
    blacklistProduct, removeBlacklistProduct
} = require("../controllers/productController");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");

router.post("/create-product", verifyToken, upload.array("images", 4), createProduct);

router.put("/update-product/:id", verifyToken, updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/get-products", getProducts);

router.get("/get-products-by-name/:name", getProductByName);

router.put("/blacklist-product/:id", verifyToken, blacklistProduct);

router.put("/remove-blacklist-product/:id", verifyToken, removeBlacklistProduct);


module.exports = router;