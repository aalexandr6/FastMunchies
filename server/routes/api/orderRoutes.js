const router = require('express').Router();
const {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orderController.js');

// /api/orders
router.route('/').get(getOrders).post(createOrder);

// /api/orders/:orderId
router
  .route('/:orderId')
  .get(getSingleOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
