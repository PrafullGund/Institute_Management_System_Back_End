const express=require('express');
const router=express.Router();
const featureRoleMappingController=require('../featureRoleMapping/featureRoleMappingController');

router.post('/featureRoleMapping/post',featureRoleMappingController.postFeatureRoleMappingController);
router.get('/featureRoleMapping/getAll',featureRoleMappingController.getAllFeatureRoleMappingController);
router.get('/featureRoleMapping/getById/:id',featureRoleMappingController.getFeatureRoleMappingByIdController);
router.put('/featureRoleMapping/update/:id',featureRoleMappingController.updateFeatureRoleMappingController);
router.delete('/featureRoleMapping/delete/:id',featureRoleMappingController.deleteFeatureRoleMappingController);

module.exports=router;