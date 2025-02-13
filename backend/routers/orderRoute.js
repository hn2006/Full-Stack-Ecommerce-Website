const express=require('express');
const router=express.Router();
const authentication = require('../controllers/auth');
const authRole=require('../utils/authrole');
const orderController=require('../controllers/orderController');

router.post('/new',authentication,orderController.createOrder);
router.get('/:id',authentication,orderController.getUserOrders);
router.get('/getOrder/:id',authentication,orderController.getSingleOrder);
router.put('/admin/updateOrderStatus/:id',authentication,authRole('admin'),orderController.updateOrder);
router.delete('/admin/deleteOrder',authentication,authRole('admin'),orderController.deleteOdrer);
router.get('/orders',authentication,authRole('admin'),orderController.getUserOrders);
router.get('/admin/getOrders',authentication,authRole('admin'),orderController.getAllOrders);

module.exports=router;