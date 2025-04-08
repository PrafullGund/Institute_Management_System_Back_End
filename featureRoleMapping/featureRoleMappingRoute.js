const express=require('express');
const router=express.Router();
const featureRoleMappingController=require('../featureRoleMapping/featureRoleMappingController');

router.post('/featureRoleMapping',featureRoleMappingController.postFeatureRoleMappingController);
router.get('/featureRoleMapping',featureRoleMappingController.getAllUserRoleMapperController)

module.exports=router;