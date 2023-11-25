const express = require('express');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require("../config/multer.config");

const user = require('../controllers/users.controller');
const products = require('../controllers/products.controller');
const cart = require('../controllers/carts.controller');
const orderController = require('../controllers/orders.controller');
const review = require('../controllers/reviews.controller');





router.post('/register',upload.single("avatar"), user.register);
router.post('/login', user.login);
router.get('/profile', auth.isAuthenticated, user.getProfile);
router.post('/logout', user.logout);

router.get('/products', products.list);

router.get('/products/:productId', products.getProductById);

router.post('/orders', auth.isAuthenticated, orderController.createOrder);
router.put('/orders/:orderId/cancel', auth.isAuthenticated, orderController.cancelOrder);
router.post('/checkout', auth.isAuthenticated, orderController.checkoutOrder);
router.put('/orders/:orderId/confirm',auth.isAuthenticated, orderController.confirmOrder);
router.get('/orders/:orderId', auth.isAuthenticated, orderController.getOrder);
router.get('/orders/user/:userId', auth.isAuthenticated, orderController.getOrdersByUser);
router.get('/users/:userId/orders/:orderId', auth.isAuthenticated, orderController.getOrderOfUser);



router.get('/cart', auth.isAuthenticated, cart.getCart);
router.post('/cart', auth.isAuthenticated, cart.addToCart);
router.put('/cart', auth.isAuthenticated, cart.updateCart);
router.delete('/cart/:productId', auth.isAuthenticated, cart.removeFromCart);

router.post('/products/:productId/reviews', auth.isAuthenticated, review.createReview);
router.get('/products/:productId/reviews', review.getProductReviews);



module.exports = router;