module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      user_id: String,
      no_table: Number,
      total_price: Number,
      is_checkouted: Boolean,
      products: Array,
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
  const Chart = mongoose.model("chart", schema);
  return Chart;
};
