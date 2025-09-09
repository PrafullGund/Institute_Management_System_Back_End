const express=require('express');
const router=express.Router();
const enquiriesController=require('../enquiries/enquiriesController');

router.post('/enquiries',enquiriesController.postEnquiriesController);
router.get('/enquiries',enquiriesController.getAllEnquiriesController);
router.get('/enquiries/:id',enquiriesController.getByIdEnquiriesController);
router.put('/enquiries/:id',enquiriesController.updateEnquiriesController);
router.delete('/enquiries/:id',enquiriesController.deleteEnquiriesController);

module.exports=router;