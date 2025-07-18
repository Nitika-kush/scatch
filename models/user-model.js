const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"product"
  }],
  order: {
    type: Array,
    default: [],
  },
  picture: String,
});
module.exports = mongoose.model("user", userSchema);
