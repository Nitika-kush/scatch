const express=require('express');
const router= express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/',(req,res)=>{
  let error=req.flash("error");
  res.render("index",{error,loggedin:false})
})

router.get('/shop',isLoggedIn, async (req,res)=>{
  let products= await productModel.find();
  const success=req.flash("success");
  res.render("shop",{products,success});
})

router.get('/cart', isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate('cart');
// console.log(user.cart);
  res.render("cart",{cart:user.cart});
})

router.get('/addtocart/:productid',isLoggedIn, async (req,res)=>{
  console.log(req.user,"mine");
 const user = await userModel.findOne({email:req.user.email});
//  console.log(user,"hello india")
 user.cart.push(req.params.productid)
 await user.save();
 req.flash("success","Added to cart")
 res.redirect("/shop")
})

router.get('/logout',isLoggedIn, (req,res)=>{
  res.render("shop")
})

module.exports=router;