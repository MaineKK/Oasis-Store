const Cart = require('../models/cart.model');


module.exports.getCart = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate('items.product')
    .then(cart => {
      res.json(cart);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error getting the cart', error: error.message });
    });
};


module.exports.addToCart = (req, res) => {
  const { productId, quantity, unitPrice } = req.body;

  Cart.findOne({ user: req.user._id })
    .then(cart => {
      if (cart) {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity, unitPrice });
        }
      } else {
        cart = new Cart({
          user: req.user._id,
          items: [{ product: productId, quantity, unitPrice }]
        });
      }
      return cart.save();
    })
    .then(cart => res.status(201).json(cart))
    .catch(error => {
      res.status(500).json({ message: 'Error adding to cart', error: error.message });
    });
};


module.exports.updateCart = (req, res) => {
  const { productId, quantity } = req.body;

  Cart.findOne({ user: req.user._id })
    .then(cart => {
      if (!cart) {
        throw new Error('Cart not found');
      }
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      return cart.save();
    })
    .then(cart => res.json(cart))
    .catch(error => {
      res.status(500).json({ message: 'Error updating cart', error: error.message });
    });
};


module.exports.removeFromCart = (req, res) => {
    const productId = req.params.productId;
  
    Cart.findOne({ user: req.user._id })
      .then(cart => {
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
        if (itemIndex > -1) {
          cart.items.splice(itemIndex, 1);
          return cart.save(); 
        } else {
          throw new Error('Item not found in cart');
        }
      })
      .then(updatedCart => res.json(updatedCart)) 
      .catch(error => res.status(500).json({ message: 'Error removing item from cart', error: error.message }));
  };

  module.exports.orderCheckout = (req, res) => {
    const { cartItems, shippingAddress, paymentMethod } = req.body;
  
    if (cartItems && cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in the cart' });
    }

    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  
    const newOrder = new Order({
      user: req.user._id, 
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
  
    newOrder.save()
      .then(order => res.status(201).json({ message: 'Order placed successfully', order }))
      .catch(error => res.status(500).json({ message: 'Error placing order', error: error.message }));
  };