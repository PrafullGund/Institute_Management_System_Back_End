const express=require('express');
const router=express.Router();
const userRoleMapperController=require('../userRoleMapper/userRoleMapperController');

router.post('/userRoleMapper',userRoleMapperController.postUserRoleMapperController);
router.get('/userRoleMapper',userRoleMapperController.getAllUserRoleMapperController)

module.exports=router;