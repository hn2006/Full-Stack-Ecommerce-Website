const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');
const authentication=require('../controllers/auth')
const authRoleAdmin=require('../utils/authrole');

router.post('/new',authentication,authRoleAdmin('admin'),productController.createProduct);
router.get('/',productController.getAllProducts);
router.get('/:id',productController.productDetails);
router.put('/:id',authentication,authRoleAdmin('admin'),productController.updateProduct);
router.delete('/:id',authentication,authRoleAdmin('admin'),productController.deleteProduct);
router.get('/admin/getproducts',authentication,authRoleAdmin('admin'),productController.adminallproducts);


module.exports=router;