const mongoose = require('mongoose');
const Product = require('./product.model'); 
const User = require('./user.model'); 

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  unitPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  session: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
