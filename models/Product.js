const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    os: { type: String },
    memory: { type: String },
    processor : { type: String },
    storage : { type: String },
    model: { type: String },
    brand: { type: String },
    color: { type: String },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
