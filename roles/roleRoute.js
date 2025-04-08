const express=require('express');
const router=express.Router();
const roleController=require('../roles/roleController');

router.post('/role',roleController.postRoleController);
router.get('/role',roleController.getAllRoleController)

module.exports=router;