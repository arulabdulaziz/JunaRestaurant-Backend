const db = require("../models");
const Chart = db.chart;
const Product = db.product;
class ChartController {
  static async show(req, res, next) {
    try {
      const userId = req.loginUser.id;
      const existedChart = await Chart.findOne({ user_id: userId });
      if (!existedChart) {
        const payload = {
          user_id: userId,
          no_table: 0,
          total_price: 0,
          is_checkouted: false,
          products: [],
        };
        const newChart = new Chart(payload);
        const result = await newChart.save();
        return res.status(201).json({ data: result });
      }
      return res.status(200).json({ data: existedChart });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
  static async create(req, res, next) {
    try {
      const userId = req.loginUser.id;
      let { no_table } = req.body;
      if (!no_table || Number(no_table)) no_table = 0;
      let products = req?.body?.products ? req?.body?.products : [];
      products = products.filter(
        (e) =>
          e.id &&
          (Number(e.price) || Number(e.price) === 0) &&
          Number(e.quantity) &&
          e.name &&
          e.picture
      );
      // if (!products || products.length === 0) {
      //   return res.status(400).json({
      //     message: `Products Cannot Empty! Send Using Format Array<Object{
      //     id: String
      //     price: Number
      //     quantity: Number
      //     name: String
      //     picture: String
      //   }>`,
      //   });
      // }
      const totalPrice = products
        .map((e) => Number(e.price) * Number(e.quantity))
        .reduce((partialSum, a) => partialSum + a, 0);
      const payload = {
        user_id: userId,
        no_table,
        total_price: totalPrice,
        is_checkouted: false,
        products,
      };
      const existingChart = await Chart.findOneAndUpdate(
        {
          user_id: userId,
        },
        payload,
        {
          returnOriginal: false,
          new: false,
        }
      );
      if (!existingChart) {
        const newChart = new Chart(payload);
        const result = await newChart.save();
        return res.status(201).json({ data: result });
      }
      return res.status(201).json({ data: existingChart });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
  static async addProductToChart(req, res, next) {
    try {
      const product = req.body.product ?? {};
      product.quantity = Number(product?.quantity) || 1;
      product.price = Number(product?.price) || 0;
      if (!product || !product.id || !product.name || !product.picture)
        return res.status(400).json({
          message: `Product Cannot Empty! Send Using Format Object<{
           id: String
           price: Number
           quantity: Number
           name: String
           picture: String
         }>`,
        });
      const userId = req.loginUser.id;
      const existedChart = await Chart.findOne({ user_id: userId });
      if (!existedChart) {
        const payload = {
          user_id: userId,
          no_table: 0,
          total_price: product.quantity * product.price,
          is_checkouted: false,
          products: [product],
        };
        const newChart = new Chart(payload);
        const result = await newChart.save();
        return res.status(201).json({ data: result });
      }
      const existProductOnChart = existedChart.products.find(
        (e) => e.id === product.id
      );
      let payload = { ...existedChart._doc };
      if (existProductOnChart) {
        payload = {
          ...payload,
          products: existedChart.products.map((e) => {
            if (e.id === product.id)
              e.quantity =
                Number(existProductOnChart.quantity) + product.quantity;
            return e;
          }),
        };
        payload.total_price = payload.products
          .map((e) => Number(e.price) * Number(e.quantity))
          .reduce((partialSum, a) => partialSum + a, 0);
      } else {
        const products = existedChart.products;
        products.push(product);
        payload = {
          ...payload,
          products,
        };
      }
      const result = await Chart.findOneAndUpdate(
        { id: existedChart.id, user_id: userId },
        payload,
        {
          returnOriginal: false,
          new: false,
        }
      );
      return res.status(201).json({ data: result });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error retrieving products.",
        error,
      });
    }
  }
}
module.exports = ChartController;