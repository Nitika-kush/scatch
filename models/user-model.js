const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/scatch`);

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  order: {
    type: Array,
    default: [],
  },
  picture: String,
});
module.exports = mongoose.model("user", userSchema);
