const router = require('express').Router();
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');

router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

module.exports = router;

