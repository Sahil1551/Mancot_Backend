const Cart=require('../models/cart')
const mongoose=require('mongoose')
const Products=require('../models/products')
const cartController={
    addToCart: async (req, res) => {
        try {
          const { user, product: productId, quantity } = req.body;
    
          // Validate required fields
          if (!user || !productId || !quantity) {
            return res.status(400).json({ msg: "Fields are required" });
          }
    
          // Find the product by productId
          const product = await Products.findById(productId);
    
          // Check if product exists
          if (!product) {
            return res.status(404).json({ msg: "Product not found" });
          }
    
          // Find or create cart for the user
          let cart = await Cart.findOne({ user });
    
          if (!cart) {
            cart = new Cart({
              user,
              products: [],
              totalPrice: 0
            });
          }
    
          // Check if product already exists in cart
          const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
    
          if (existingProductIndex !== -1) {
            // If product exists, update quantity
            cart.products[existingProductIndex].quantity += quantity;
          } else {
            // If product doesn't exist, add new product to cart
            cart.products.push({
              product: productId,
              quantity,
              price: product.price // Include product price in cart item
            });
          }
    
          // Calculate total price of the cart
          cart.totalPrice = cart.products.reduce((total, item) => {
            const productPrice = item.price || 0; // Ensure product price is defined
  return total + (productPrice * item.quantity);
          }, 0);
    
          // Save the updated cart
          await cart.save();
    
          res.status(201).json(cart);
    
        } catch (error) {
          console.error('Error adding to cart:', error);
          res.status(500).json({ msg: 'Server error' });
        }
      },
      removeItem:async(req,res)=>{
        try{
          const {id}=req.params;
          const cart = await Cart.findOneAndUpdate(
            { 'products.product': id },
            { $pull: { products: { product: id } } },
            { new: true }
        );

        // If cart is not found, send a 404 response
        if (!cart) {
            return res.status(404).json({ msg: 'Cart or product not found' });
        }

        // Recalculate the total price
        cart.totalPrice = cart.products.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);

        // Save the updated cart
        await cart.save();
        return res.json(cart);
        }
        catch(err){
          res.status(500).json({ msg: 'Error Deleting item' });
 
        }
      },
      DeleteCart:async(req,res)=>{
        const {id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ msg: 'Invalid Object ID' });
        }
        try{
          const iid = new mongoose.Types.ObjectId(id);
    
        const data = await Cart.findByIdAndUpdate(
          iid,
          {
            products: [],
            totalPrice: 0,
          },
          { new: true }
        );
    
        if (!data) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        return res.status(200).json( {cart: data });

        }
      catch(err){
        return res.json("error")
      }      },
    getCart:async(req,res)=>{
        try {
            const userId = req.params.userId;

            // Find cart for the user
            const cart = await Cart.findOne({ user: userId }).populate('products.product');

            if (!cart) {
                return res.status(404).json({ msg: "Cart not found" });
            }

            res.json(cart);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }    
    }

module.exports=cartController