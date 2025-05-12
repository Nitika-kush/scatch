const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const path=require('path');
const db=require('./config/mongoose-connection')
const ownersRouter=require('./routes/ownersRouter')
const productsRouter=require('./routes/productsRouter')
const indexRouter=require('./routes/index')
const usersRouter=require('./routes/usersRouter')
const flash = require('connect-flash');
const session = require('express-session')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(cookieParser());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash());
app.use('/owners',ownersRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/',indexRouter);

app.listen(8000);