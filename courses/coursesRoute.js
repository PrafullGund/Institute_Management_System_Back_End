const express=require('express');
const router = express.Router();
const coursesController=require('../courses/coursesController');

router.post('/courses/post',coursesController.postCoursesController);
router.get('/course',coursesController.getAllCoursesController);
router.get('/course/:id',coursesController.getByIdCourseController);
router.put('/course/update/:id',coursesController.updateCoursesController);
router.delete('/course/delete/:id',coursesController.deleteCoursesController);

router.post('/courses/with-type',coursesController.addCourseController);
router.get('/courses/with-type',coursesController.getCoursesWithTypeController);
router.get('/courses/with-type/:id',coursesController.getCoursesWithTypeByIdController);
router.put('/courses/with-type/:id',coursesController.updateCourseWithTypeService);
router.delete('/courses/with-type/:id',coursesController.deleteCourseWithTypeService);

module.exports=router;