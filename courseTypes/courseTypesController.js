const courseTypesService = require('../courseTypes/courseTypesService');

const postCourseTypeController = async (req, res) => {
    try {

        const result = await courseTypesService.postCourseTypeService(req.body);
        res.status(200).json({ success: true, message: 'Course Types Added Successfully', data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllCoursesController = async (req, res) => {
    try {

        const result = await courseTypesService.getAllCoursesService();
        res.status(200).json({ success: true, data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdCourseTypeController = async (req, res) => {
    try {

        const courseTypeId = req.params.id;
        const result = await courseTypesService.getByIdCourseTypeService(courseTypeId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Course Type Not Found' })
        } else {
            res.status(200).json({ success: true, data: result[0] })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateCoursesTypeController = async (req, res) => {
    try {

        const courseTypeId = req.params.id;
        const courseTypeData = req.body;
        const result = await courseTypesService.updateCoursesTypeService(courseTypeId, courseTypeData);

        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Course Type Update Successfully', data: result })
        } else {
            res.status(404).json({ success: false, message: 'Course Type Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteCourseTypeController = async (req, res) => {
    try {
        const courseTypeId = req.params.id;
        const result = await courseTypesService.deleteCourseTypeService(courseTypeId);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Course Type Deleted Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Course Type Not Found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postCourseTypeController,
    getAllCoursesController,
    getByIdCourseTypeController,
    updateCoursesTypeController,
    deleteCourseTypeController
}