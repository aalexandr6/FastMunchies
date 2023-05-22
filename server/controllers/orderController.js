const { Order} = require('../models');

module.exports = {
    // gets all orders

    async getOrders(req, res) {
      try {
        const orders = await Order.find();
        res.json(order);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Gets an order
async getSingleOrder(req, res) {
    try {
      const order = await Order.findOne({ _id: req.params.orderId })
        .select('-__v');

      if (!order) {
        return res.status(404).json({ message: 'There is no order with that Id' });
      }
    res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//   create an order
  async createOrder(req, res) {
    try {
      const order = await Order.create(req.body);
      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// updates an order
    async updateOrder(req, res) {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.orderId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!order) {
        res.status(404).json({ message: 'There is no order with that Id.' });
      }

      res.json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// delete an order
  async deleteOrder(req, res) {
    try {
      const order = await Order.findOneAndDelete({ _id: req.params.orderId });
      if (!order) {
        res.status(404).json({ message: 'There is no order with that Id.' });
      }

      res.json({ message: 'Order was successfully deleted.' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
};











