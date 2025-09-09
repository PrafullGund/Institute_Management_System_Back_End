const express=require('express');
const router=express.Router();
const communicationLogController=require('../communicationLog/communicationLogController');

router.post('/communicationLog',communicationLogController.postCommunicationLogController);
router.get('/communicationLog',communicationLogController.getAllCommunicationLogController);
router.get('/communicationLog/:id',communicationLogController.getByIdCommunicationLogController);
router.put('/communicationLog/:id',communicationLogController.updateCommunicationLogController);
router.delete('/communicationLog/:id',communicationLogController.deleteCommunicationLogController);

module.exports=router