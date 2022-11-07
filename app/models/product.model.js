module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      picture: String,
      price: Number,
    },
    {
      timestamps: true,
    }
  );
  schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Product = mongoose.model("product", schema);
  return Product;
};
