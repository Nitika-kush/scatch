const express=require('express');
const router= express.Router();
const ownerModel=require('../models/owner-model')

//ye create wala route  sirf development phase me chlana hai so hme check karna h k process ka environment kya hai so
// console.log("procee env",process.env.NODE_ENV);
if(process.env.NODE_ENV=="development"){
  router.post('/create',async (req,res)=>{
//sirf ek hi owner hona chahiye so check karege ki owner ki length 0 se jyada na ho age 1 bhi h to return kr de nhi to fir ownerModel ki help se new owner create karege
let owners=await ownerModel.find();
if(owners.length>0){
  return res.status(404).send('not permission to create a new  owner');
}
 //yahi owner ni h to yaha pe new owner create karege
 const {fullname,email, password}=req.body;
 let createdOwner=await ownerModel.create({
  fullname,
  email,
  password
 })
  res.status(201).send(createdOwner);
  })
}

router.get('/admin',(req,res)=>{
  let success=req.flash("success")
  res.render("createproducts",{success})
  // res.send("yes");
})

module.exports=router;