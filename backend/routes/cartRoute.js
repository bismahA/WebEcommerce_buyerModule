const cartRoute = require("express").Router();
const {addToCart,viewCart}=require("../controller/cartController");

cartRoute.post("/addProduct",addToCart);
cartRoute.get("/viewCart",viewCart);

module.exports=cartRoute;