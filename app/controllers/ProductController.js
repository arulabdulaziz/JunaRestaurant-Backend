const db = require("../models");
const Product = db.product;
class ProductController {
  static async index(req, res, next) {
    try {
      const product = await Product.find();
      return res.status(200).json({ data: product });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
      });
    }
  }
  static async create(req, res, next) {
    try {
      const product = new Product({
        name: req.body.name,
        picture: req.body.picture,
        price: Number(req.body.price ? req.body.price : 0),
      });
      const result = await product.save(product);
      return res.status(201).json({ data: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
      });
    }
  }
  static async show(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      return res.status(200).json({ data: product });
      // Product.findById(req.params.id, (err, result) => {
      //   if (!result) {
      //     return res.status(404).json({ message: "Product Not Found" });
      //   }
      //   return res.status(200).json(result);
      // });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
  static async update(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        picture: req.body.picture,
        price: Number(req.body.price ? req.body.price : 0),
      };
      const product = await Product.findOneAndUpdate(
        { id: req.params.id },
        payload,
        {
          returnOriginal: false,
          new: false,
        }
      );
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      return res.status(200).json({ data: product });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
  static async delete(req, res, next) {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      return res.status(200).json({ data: product });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
}
module.exports = ProductController;
