const Product = require('../models/product.model');

module.exports.list = (req, res, next) => {
  let query = {};
  let sort = {};

  if (req.query.petFriendly && req.query.productType === 'plant') {
    query.petFriendly = req.query.petFriendly === 'true';
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.productType) {
    query.productType = req.query.productType;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.sortPrice) {
    sort.price = req.query.sortPrice === 'desc' ? -1 : 1;
  }


  Product.find(query)
    .sort(sort)
    .then(products => res.json(products)) 
    .catch(e => next(e));
};

module.exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product); 
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error fetching product', error: error.message });
    });
};

