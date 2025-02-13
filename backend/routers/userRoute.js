const express=require('express');
const userController=require('../controllers/userController');
const authentication=require('../controllers/auth');
const authRole=require('../utils/authrole');

const router=express.Router();

router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/logout',userController.logOut);
router.put('/changePassword',authentication,userController.changePassword)
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword/:token',userController.resetPassword);
router.get('/profile',authentication,userController.getUserDetails);
router.put('/profile',authentication,userController.updateProfile);
router.get('/admin/getUsers',authentication,authRole('admin'),userController.getAllUsers);
router.delete('/admin/deleteUser/:id',authentication,authRole('admin'),userController.deleteUser);
router.get('/admin/changeRole/:id',authentication,authRole('admin'),userController.updateUserRole);
router.post('/review',authentication,userController.addProductReview);
router.delete('/deleteReview',authentication,authRole('admin'),userController.deleteReview);

module.exports=router;