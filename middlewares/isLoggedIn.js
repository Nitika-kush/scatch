const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    const user = await userModel.findOne({ email: decoded.email }).select("-password"); // ✅ await here

    if (!user) {
      req.flash("error", "you need to login first");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }
};
