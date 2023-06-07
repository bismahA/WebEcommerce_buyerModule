const cartModel = require("../models/cart")
const productModel = require("../models/product")
const jwt = require('jsonwebtoken');

let addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const token = req.headers['token'];
    console.log(token);

    console.log(productId)
    try {
        // Verify and decode the token to extract the userId
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.id;
        console.log(userId)

        // Check if the cart already exists for the user
        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            // If the cart doesn't exist, create a new cart
            cart = new cartModel({
                user: userId,
                products: [],
                totalPrice: 0
            });
        }
        console.log(cart.user)

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(product => product.product.toString() === productId);

        if (existingProduct) {
            // If the product exists, update its quantity and total price
            existingProduct.quantity += quantity;
            existingProduct.price += quantity * existingProduct.price;
            //existingProduct.price += quantity * product.price; // Fix: Use existingProduct.price instead of product.price
        } else {
            const product = await productModel.findById(productId);
            console.log(product)
            if (product) {
                // Create a new cart product object with the product details
                const cartProduct = {
                    product: product._id,
                    quantity: quantity,
                    price: quantity * product.price
                };
                console.log(cartProduct)

                cart.products.push(cartProduct);
            } else {
                return res.status(404).json({ error: 'Product not found' });
            }
        }

        // Update the total price of the cart
        // cart.totalPrice = cart.products.reduce((total, product) => total + product.price, 0);
        let totalPrice = 0;
        for (const product of cart.products) {
            totalPrice += product.price;
        }
        console.log(totalPrice)
        cart.totalPrice = totalPrice;
        console.log(cart)

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Unable to add product to cart' });
    }
   
}

let viewCart=async(req,res)=>{
    try {
        // Get the token from the request header
        const token = req.headers['token'];
    
        // Verify and decode the token to extract the userId
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.id;
    
        // Find the cart for the user
        const cart = await cartModel.findOne({ user: userId }).populate('products.product');
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        res.status(200).json({ cart });
      } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ error: 'Unable to retrieve cart' });
      }

}

module.exports = {
    addToCart,
    viewCart
}