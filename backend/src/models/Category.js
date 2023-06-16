const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});

module.exports = model("category", categorySchema);
