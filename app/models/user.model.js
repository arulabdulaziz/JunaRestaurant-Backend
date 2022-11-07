module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: String,
      full_name: String,
      password: String,
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
  const Product = mongoose.model("user", schema);
  return Product;
};
