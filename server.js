require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const errorMiddleware = require('./middleware/errorMiddleware')
// const userRoute = require("./routes/userRoute")
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 4200;
// const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({extended: true}))

//routes

app.use('/api/products',productRouter)
// app.use('/api/users',userRoute);

app.get("/", (req, res) => {
// throw new Error('fake error')
  res.send("Hello NODE API");
});


app.get("/blog", (req, res) => {
  res.send("Hello NODE blog");
});

app.use(errorMiddleware);

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected mongoDb");
    app.listen(4200, () => {
      console.log("Node API is running on port 4200");
    });
  })
  .catch((err) => {
    console.log(err);
  });
