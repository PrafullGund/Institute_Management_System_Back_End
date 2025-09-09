const express=require('express');
const router = express.Router();
const featuresRoute=require('../features/featuresController');

router.post('/features/post',featuresRoute.postFeaturesController);
router.get('/features/getAll',featuresRoute.getAllFeaturesController);
router.get('/features/getById/:id',featuresRoute.getFeaturesByIdController);
router.put('/features/update/:id',featuresRoute.updateFeaturesController);
router.delete('/features/delete/:id',featuresRoute.deleteFeaturesController);

module.exports=router;