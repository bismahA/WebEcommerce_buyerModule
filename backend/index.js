const mongoose=require("mongoose");
const express=require("express");
const productRoute=require("./routes/productRoute")

require('dotenv').config();
const app=express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("ho gaya connect mazay karo")

}).catch(err=>{
    console.log("no mazay "+err);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`ho gaya ${process.env.PORT} par connect ab jo karna hay karo`);
})

app.use("/product",productRoute)


