const express=require('express');
const router=express.Router();
const userController=require('./userController');

router.post('/registration',userController.addUser);
router.get('/register',userController.getAllRegisterUsersController);
router.get('/register/:id',userController.getRegisterUserByIdController)
router.put('/register/:id',userController.updateRegisterUserController);
router.delete('/register/:id',userController.deleteRegisterUserController);

router.post('/user',userController.postUserController);
router.get('/user',userController.getAllUserController);
router.get('/user/:id',userController.getUserByIdController);
router.put('/user/:id',userController.updateUserController);
router.delete('/user/:id',userController.deleteUserController);

router.post('/signIn',userController.signIn);

module.exports=router;