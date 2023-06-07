const cartRoute = require("express").Router();
const {addToCart}=require("../controller/cartController");

cartRoute.post("/addProduct",addToCart);

module.exports=cartRoute;