const express=require('express');
const router = express.Router();
const activitiesController=require('../activities/activitiesController');

router.post('/activities/post',activitiesController.postActivitiesController);
router.get('/activities/getAll',activitiesController.getAllActivitiesController);
router.get('/activities/:id',activitiesController.getByIdActivitiesController);
router.put('/activities/activitiesUpdate/:id',activitiesController.updateActivitiesController);
router.delete('/activities/activitiesDelete/:id',activitiesController.deleteActivitiesController);

module.exports=router;