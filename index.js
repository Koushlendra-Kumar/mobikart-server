const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const Product = require("./models/Product");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.send("Welcome to Mobikart!!");
});

app.get("/products", async (req, res) => {
  try {
    let price = req.query.price
      ?.split(",")
      .map((val) => Number(val))
      .sort((a, b) => b - a);
    let brands = req.query.brand?.split(",");
    let memory = req.query.memory?.split(",");
    let processor = req.query.processor?.split(",");

    const filters = {};
    if (price) {
      filters.price = { $lte: price[0] };
    }
    if (brands) {
      filters.brand = { $in: brands };
    }
    if (memory) {
      filters.memory = { $in: memory };
    }
    if (processor) {
      filters.processor = { $in: processor };
    }

    await Product.find(filters)
      .sort("-price")
      .then((products) => {
        res.json(products);
      });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
