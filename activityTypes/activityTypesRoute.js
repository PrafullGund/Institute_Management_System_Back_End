const express = require('express');
const router = express.Router();
const activityTypesController = require('./activityTypesController');

router.post('/activityTypes/post', activityTypesController.postActivityTypesDataController);
router.get('/activityTypes/getAll',activityTypesController.getAllActivityTypesController);
router.get('/activityTypes/getById/:id',activityTypesController.getAllActivityTypesByIdController);
router.put('/activityTypes/update/:id',activityTypesController.updateActivityTypesController);
router.delete('/activityTypes/delete/:id',activityTypesController.deleteActivityTypesController);

module.exports = router;