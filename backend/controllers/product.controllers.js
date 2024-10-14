import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in Fetching Products", error.mesage);
    res.status(500).json({ success: false, message: error.mesage });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product); // Objekt von product.model.js und das product vom body übergeben wir (price, image, name)
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // internal Server Error(500)
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // if (mongoose.isValidObjectId(id)) {
  //   return res.status(404).json({ success: false, message: "Invalid Product" });
  // }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleteing Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
