const express=require('express');
const router=express.Router();
const userEducationDetailsController=require('../userEducationDetails/userEducationDetailsController');

router.post('/userEducationDetails/post',userEducationDetailsController.postUserEducationController);
router.get('/userEducationDetails/getAll',userEducationDetailsController.getAllEducationDetailsController);
router.get('/userEducationDetails/getById/:id',userEducationDetailsController.getAllEducationDetailsByIdController);
router.put('/userEducationDetails/update/:id',userEducationDetailsController.updateEducationDetailsController);
router.delete('/userEducationDetails/delete/:id',userEducationDetailsController.deleteEducationDetailsController);

module.exports=router;