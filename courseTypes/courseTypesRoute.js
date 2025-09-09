const express = require('express');
const router = express.Router();
const courseTypesController = require('../courseTypes/courseTypesController');

router.post('/courseType/post', courseTypesController.postCourseTypeController);
router.get('/courseType/getAll', courseTypesController.getAllCoursesController);
router.get('/courseType/:id', courseTypesController.getByIdCourseTypeController);
router.put('/courseType/update/:id', courseTypesController.updateCoursesTypeController);
router.delete('/courseType/delete/:id', courseTypesController.deleteCourseTypeController);

module.exports = router;