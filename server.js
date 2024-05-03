const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: true}))

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello NODE blog");
});

app.listen(4200, () => {
  console.log("Node API is running on port 4200");
});



//get the all products

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    console.log("Product fetching successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


//get the products by Id

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


//Update or edit the products by id

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: `No Such Product is Find with this ID ${id}` });
    }
    const updatedId = await Product.findById(id)
    res.status(200).json(updatedId);
    console.log("Updated Successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//adding products to the database

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    console.log("Product added successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


// delete the products from the database
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
    console.log("Deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
