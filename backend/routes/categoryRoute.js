const catRoute = require("express").Router();
const{viewCategory}=require("../controller/categoryController")

catRoute.get("/viewCat",viewCategory)

module.exports=catRoute;