const mongoose = require("mongoose");
const { Schema } = mongoose;
const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});
const photo = mongoose.model("Photos-Data", PhotoSchema);
module.exports = photo;
