const express=require('express');
const router=express.Router();
const userController=require('./userController');

router.post('/user',userController.postUserController);
router.get('/user',userController.getAllUserController);
router.get('/user/:id',userController.getUserByIdController);
router.put('/user/:id',userController.updateUserController);
router.delete('/user/:id',userController.deleteUserController);
router.post('/signIn',userController.signIn);

module.exports=router;