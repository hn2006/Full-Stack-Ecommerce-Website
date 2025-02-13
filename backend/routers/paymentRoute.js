const express=require('express');

const router=express.Router();
const authentication=require('../controllers/auth');
const paymentController=require('../controllers/paymentConroller');

router.get('/getPaymentApiKey',paymentController.sendStripeApiKey);
router.post('/createPaymentIntent',authentication,paymentController.processPayment);

module.exports=router;