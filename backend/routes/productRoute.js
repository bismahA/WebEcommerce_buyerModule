const productRoute = require("express").Router();
const {viewProduct,searchViaKeyword,filterByPrice,filterByBrand,filterByCategory}=require("../controller/productController")

productRoute.get("/view",viewProduct);
productRoute.get("/search",searchViaKeyword)
productRoute.get("/filterByPrice",filterByPrice)
productRoute.get('/filterByBrand',filterByBrand)
productRoute.get("/filterByCategory",filterByCategory)

module.exports=productRoute;

