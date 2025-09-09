const express=require('express');
const router=express.Router();
const admissionsController=require('../admissions/admissionsController');

router.post('/admissions',admissionsController.postAdmissionsController);
router.get('/',admissionsController.getAllAdmissionsController);
router.get('/:id',admissionsController.getByIdAdmissionsController);
router.put('/:id',admissionsController.updateAdmissionsController);
router.delete('/:id',admissionsController.deleteAdmissionsController);

module.exports=router;