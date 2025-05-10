const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a product
router.post("/products", productController.createProduct);

// Get all products (with optional search)
router.get("/products", productController.getAllProducts);

// Add this to your existing routes
router.get("/products/:id", productController.getProductById);

module.exports = router;
