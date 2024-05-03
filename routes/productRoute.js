const express = require("express");
const Product = require("../models/productModel");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();



//get the all products

router.get("/", getProducts);

//get the products by Id

router.get("/:id", getProduct);

//Update or edit the products by id

router.put("/:id", updateProduct);

//adding products to the database

router.post("/", createProduct);

// delete the products from the database
router.delete("/:id", deleteProduct);

module.exports = router;
