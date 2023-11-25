const Review = require('../models/review.model');


module.exports.createReview = (req, res) => {
  const { product, text, rating } = req.body;

  const review = new Review({
    user: req.user._id, 
    product,
    text,
    rating
  });

  review.save()
    .then(createdReview => res.status(201).json(createdReview))
    .catch(err => res.status(500).json({ message: "Error creating review", error: err }));
};


module.exports.getProductReviews = (req, res) => {
  Review.find({ product: req.params.productId })
    .populate('user', 'name') 
    .then(reviews => res.json(reviews))
    .catch(err => res.status(500).json({ message: "Error fetching reviews", error: err }));
};


