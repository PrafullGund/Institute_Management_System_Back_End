const coursesService = require('../courses/coursesService');

const postCoursesController = async (req, res) => {
    try {
        const result = await coursesService.postCoursesService(req.body);
        res.status(201).json({ success: true, message: 'Courses Added Successfully', data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllCoursesController = async (req, res) => {
    try {
        const result = await coursesService.getAllCoursesService();
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdCourseController = async (req, res) => {
    try {
        const coursesId = req.params.id;
        const result = await coursesService.getByIdCourseService(coursesId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Courses Not Found' });
        } else {
            res.status(201).json({ success: true, data: result[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateCoursesController = async (req, res) => {
    try {
        const coursesId = req.params.id;
        const courseData = req.body;
        const result = await coursesService.updateCoursesService(coursesId, courseData);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Course Update Successfully', data: result })
        } else {
            res.status(404).json({ success: false, message: 'Courses Not Found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteCoursesController = async (req, res) => {
    try {
        const coursesId = req.params.id;
        const result = await coursesService.deleteCoursesService(coursesId);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Courses Delete Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Courses Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postCoursesController,
    getAllCoursesController,
    getByIdCourseController,
    updateCoursesController,
    deleteCoursesController
}