const collection = process.env.MONGODB_COllECTION || "juna_restaurant";
const urlLokal = "mongodb://localhost:27017/" + collection;
module.exports = {
  url:
    process.env.NODE_ENV == "production"
      ? process.env.MONGODB_URI || urlLokal
      : urlLokal,
};
