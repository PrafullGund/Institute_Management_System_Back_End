const express=require('express');
const router=express.Router();
const featuresController=require('../features/featuresController');

router.post('/features',featuresController.postFeaturesController);
router.get('/features',featuresController.getAllFeaturesController)

module.exports=router;