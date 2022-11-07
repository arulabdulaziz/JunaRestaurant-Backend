const collection = process.env.MONGODB_COllECTION || "juna_restaurant";
module.exports = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/" + collection,
};
