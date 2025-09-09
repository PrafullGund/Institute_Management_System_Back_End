const express=require('express');
const router=express.Router();
const courseSubjectMappingController=require('../courseSubjectMapping/courseSubjectMappingController');

router.post('/courseSubjectMapping',courseSubjectMappingController.postCourseSubjectMappingController);
router.get('/courseSubjectMapping',courseSubjectMappingController.getAllCourseSubjectMappingController);
router.get('/courseSubjectMapping/:id',courseSubjectMappingController.getByIdCourseSubjectMappingController);
router.put('/courseSubjectMapping/:id',courseSubjectMappingController.updateCourseSubjectMappingController);
router.delete('/courseSubjectMapping/:id',courseSubjectMappingController.deleteCourseSubjectMappingController);

module.exports=router;