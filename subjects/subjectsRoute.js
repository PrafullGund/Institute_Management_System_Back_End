const express=require('express');
const router=express.Router();
const subjectsController=require('../subjects/subjectsController');

router.post('/subjects',subjectsController.postSubjectsController);
router.get('/subjects',subjectsController.getAllSubjectsController);
router.get('/subjects/:id',subjectsController.getByIdSubjectsController);
router.put('/subjects/:id',subjectsController.updateSubjectController);
router.delete('/subjects/:id',subjectsController.deleteEnquiriesController);

module.exports=router;