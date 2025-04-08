const express=require('express');
const router=express.Router();
const usersController=require('../users/usersController');

router.post('/signIn',usersController.signIn);
router.post('/users',usersController.postUsersController);
router.get('/users',usersController.getAllUsersController);
router.get('/users/:id',usersController.getByIdUsersController);
router.put('/users/:id',usersController.updateUsersController);
router.delete('/users/:id',usersController.deleteUsersController);

module.exports=router;