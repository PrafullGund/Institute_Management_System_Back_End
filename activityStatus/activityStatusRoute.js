const express=require('express');
const router=express.Router();
const activityStatusController=require('../activityStatus/activityStatusController');

router.post('/activityStatus/post',activityStatusController.postActivityStatusController);
router.get('/activityStatus/getAll',activityStatusController.getAllActivityStatusController);
router.get('/activityStatus/getById/:id',activityStatusController.getActivityStatusByIdController);
router.put('/activityStatus/update/:id',activityStatusController.updateActivityStatusService);
router.delete('/activityStatus/delete/:id',activityStatusController.deleteActivityStatusController);

module.exports=router;