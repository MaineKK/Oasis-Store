const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

module.exports.createOrder = (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  
  if (orderItems && orderItems.length === 0) {
    return res.status(400).send({ message: 'No order items to create an order.' });
  } else {
    const order = new Order({
      user: req.user._id, 
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: 'pending' 
    });

    order.save()
      .then(createdOrder => res.status(201).json(createdOrder))
      .catch(err => res.status(500).json({ message: "Error creating order", error: err }));
  }
};

module.exports.getOrder = (req, res) => {
  Order.findById(req.params.orderId)
    .populate('user', 'name email')
    .populate('orderItems.product')
    .then(order => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
      res.json(order);
    })
    .catch(err => res.status(500).json({ message: "Error fetching order", error: err }));
};


module.exports.updateOrderStatus = (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      order.status = req.body.status;
      return order.save();
    })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(err => res.status(500).json({ message: "Error updating order status", error: err }));
};

module.exports.getOrdersByUser = (req, res) => {
  const userId = req.params.userId;

  Order.find({ user: userId }) 
    .then(orders => {
      if (orders.length > 0) {
        res.json(orders);
      } else {
        res.status(404).json({ message: 'Orders not found for this user.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching user's orders", error: err });
    });
};


module.exports.cancelOrder = (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
      
      order.status = 'cancelled';
      return order.save();
    })
    .then(updatedOrder => res.json({ message: 'Order cancelled successfully.', updatedOrder }))
    .catch(err => res.status(500).json({ message: "Error cancelling order", error: err }));
};

module.exports.checkoutOrder = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .then(cart => {
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      const orderItems = cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }));

      
      const totalPrice = orderItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

      const newOrder = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress: req.body.shippingAddress || cart.shippingAddress, 
        paymentMethod: req.body.paymentMethod || cart.paymentMethod, 
        totalPrice
      });


      newOrder.save()
        .then(order => {
          return Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } }, { new: true });
        })
        .then(updatedCart => {
          res.status(201).json({ message: 'Order created successfully from cart', order: newOrder });
        })
        .catch(error => {
          res.status(500).json({ message: 'Error creating order from cart', error: error.message });
        });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error fetching cart for checkout', error: error.message });
    });
};

module.exports.confirmOrder = (req, res) => {
  const orderId = req.params.orderId;

 
  Order.findByIdAndUpdate(orderId, { status: 'confirmed' }, { new: true })
      .then(updatedOrder => {
          res.status(200).json({ message: 'Order confirmed', order: updatedOrder });
      })
      .catch(error => {
          res.status(500).json({ message: 'Error confirming order', error: error.message });
      });
};


module.exports.getOrdersByUser = (req, res) => {
  const userId = req.params.userId;

  Order.find({ user: userId }) 
    .then(orders => {
      if (orders.length > 0) {
        res.json(orders);
      } else {
        res.status(404).json({ message: 'Orders not found for this user.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching user's orders", error: err });
    });
};

module.exports.getOrderOfUser = (req, res) => {
  const { userId, orderId } = req.params;

  Order.findOne({ _id: orderId, user: userId })
    .populate('user', 'name email')
    .populate('orderItems.product')
    .then(order => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found for this user.' });
      }
      res.json(order);
    })
    .catch(err => res.status(500).json({ message: "Error fetching user's order", error: err }));
};