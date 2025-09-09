const express=require('express');
const router=express.Router();
const syllabusController=require('../syllabus/syllabusController');

router.post('/',syllabusController.postSyllabusController);
router.get('/',syllabusController.getAllSyllabusController);
router.get('/:id',syllabusController.getByIdSyllabusController);
router.put('/:id',syllabusController.updateSyllabusController);
router.delete('/:id',syllabusController.deleteSubjectController);

module.exports=router;