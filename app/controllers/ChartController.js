const db = require("../models");
const Chart = db.chart;
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
      const { no_table } = req.body;
      if (!no_table || Number(no_table) || !(Number(no_table) === 0))
        return res
          .status(400)
          .json({ message: "No Table (no_table) Required as a Number!" });
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
}
module.exports = ChartController;
