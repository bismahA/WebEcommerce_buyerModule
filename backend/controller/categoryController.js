const categoryModel=require("../models/categories");

let viewCategory=async(req,res)=>{
    try {
        // Fetch all categories from the database
        const categories = await categoryModel.find({}, 'name');
    
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
      }
}

module.exports={
    viewCategory
}