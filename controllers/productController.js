const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get all products

const getProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    console.log("Product fetching successfully");
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a single product

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //   console.log(id);
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});

//create a product

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    console.log("Product added successfully");
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update a product

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(404);
      throw new Error(`No Such Product is Find with this ID ${id}`);
    }
    const updatedId = await Product.findById(id);
    res.status(200).json(updatedId);
    console.log("Updated Successfully");
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//delete a product

const deleteProduct = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
