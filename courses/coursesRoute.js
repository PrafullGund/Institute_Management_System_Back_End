const express=require('express');
const router = express.Router();
const coursesController=require('../courses/coursesController');

router.post('/courses/post',coursesController.postCoursesController);
router.get('/course',coursesController.getAllCoursesController);
router.get('/course/:id',coursesController.getByIdCourseController);
router.put('/course/update/:id',coursesController.updateCoursesController);
router.delete('/course/delete/:id',coursesController.deleteCoursesController);

module.exports=router;