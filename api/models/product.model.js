const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    petFriendly: {
      type: Boolean,
      required: function() { return this.productType === 'plant'; } 
    },
    category: {
      type: String,
      required: true,
      enum: ['indoor', 'outdoor', 'accessories'] 
    },
    size: {
      type: [String], 
      required: true,
      enum: ['S', 'M', 'L']
    },
    imageUrls: {
      type: [String],
      default: []
    },
    productType: { 
      type: String,
      required: true,
      enum: ['plant', 'pot']
    }
  }, {
    timestamps: true
  });
  
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
