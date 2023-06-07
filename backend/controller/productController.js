const productModel=require("../models/product");
const CategoryModel=require("../models/categories")

let viewProduct=async(req,res)=>{
    try {
        const products = await productModel.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
}

let searchViaKeyword=async(req,res)=>{
    const keyword = req.query.keyword; // Assuming the keyword is passed as a query parameter

    try {
      const products = await productModel.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'No products found' });
    }

}

let filterByPrice=async(req,res)=>{
    try {
        const products = await productModel.find().sort({ price: -1 });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to filter products by price' });
      }

}

let filterByBrand=async(req,res)=>{
    const brandName = req.query.brand; // Assuming the brand name is passed as a request parameter

  try {
    const products = await productModel.find({ brand: brandName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter products by brand' });
  }
}

let filterByCategory=async(req,res)=>{
        const categoryId = req.query.category;
      
        try {
          // Find the category based on the provided category name
          const category = await CategoryModel.findById(categoryId);
      
          if (!category) {
            return res.status(404).json({ error: 'Category not found' });
          }
      
          // Fetch the products associated with the category
          const products = await productModel.find({ category: category._id });
      
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: 'Failed to filter products by category' });
        }
      
      
}

module.exports={
    viewProduct,
    searchViaKeyword,
    filterByPrice,
    filterByBrand,
    filterByCategory
}