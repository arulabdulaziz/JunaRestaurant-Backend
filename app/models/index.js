const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {
  mongoose,
  url: dbConfig.url,
  product: require("./product.model")(mongoose),
  user: require("./user.model")(mongoose)
};
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Success connect");
  })
  .catch((err) => {
    console.log("Error to connect", err);
    process.exit();
  });

module.exports = db;
