const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

router.get("/", (req, res) => {
  res.send("hey i am a user");
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
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
          const token = jwt.sign({email,id:user._id},"aminiti")  
          res.cookie("token",token);        
          res.send("user registered succefully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;