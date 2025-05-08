const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/scatch`);

const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  picture: String,
  products:{
    type:Array,
    default:[]
  },
  gstin:String,
});
module.exports = mongoose.model("owner", ownerSchema);
