const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken}=require('../utils/generateToken')

module.exports.registerUser= async function(req, res){
  try {
  const { fullname, email, password } = req.body;
  const user=await userModel.findOne({email:email});
  if(user) {
    req.flash("error","You already have an account ")
    return res.redirect("/");
  }
    bcrypt.genSalt(10, function (err, salt) {
      // console.log(salt);
      bcrypt.hash(password, salt, async function (err, hash) {
        // console.log(hash);
        if (err) return res.send(err.message);
        else {
          const user = await userModel.create({
            fullname,
            email,
            password:hash,
          });
          const token=generateToken(user);
          res.cookie("token",token);        
          res.redirect("/");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports.loginUser=async function(req, res){
  const {email,password}=req.body;
  const user=await userModel.findOne({email:email});
  if(!user) {
    req.flash("error","incorrect")
    return res.redirect("/");
  }

  //if user is there then we will compare the password with the previous password

  bcrypt.compare(password,user.password,function(err,result){
    // console.log(result);
    if(result){
      let token=generateToken(user);
      res.cookie("token",token);
      res.redirect("/shop");
    }
    else{
      req.flash("error","incorrect")
      return res.redirect("/");
    }
  })
}
module.exports.logoutUser=async function(req, res){
  console.log("logout")
  res.cookie("token","");
  // res.cookie("token","",{
  //   httpOnly: true,
  //   expires: new Date(0) // purani date dekar expire kar dena
  // });
  res.redirect("/")
}