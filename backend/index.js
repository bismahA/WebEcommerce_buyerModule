const mongoose=require("mongoose");
const express=require("express");
const cors = require("cors");
const productRoute=require("./routes/productRoute")
const catRoute=require("./routes/categoryRoute")
const cartRoute=require("./routes/cartRoute")
const userRoute=require("./routes/userRoute")

require('dotenv').config();
const app=express();
app.use(express.json());

app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("ho gaya connect mazay karo")

}).catch(err=>{
    console.log("no mazay "+err);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`ho gaya ${process.env.PORT} par connect ab jo karna hay karo`);
})

app.use("/product",productRoute)
app.use("/category",catRoute)
app.use("/cart",cartRoute)
app.use("/user",userRoute)


