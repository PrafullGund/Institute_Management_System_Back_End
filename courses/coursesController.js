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

const addCourseController = async (req, res) => {
    try {
        const data = req.body;

        const requiredFields = [
            'typeName','courseName','courseFees','courseDuration','courseMode'
        ];

        const missing = requiredFields.filter(f => !data[f]);
        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: `Missing fields: ${missing.join(', ')}`
            });
        }

        const courseTypePayload = {
            typeName: data.typeName,
            description: data.description || null
        };

        const coursePayload = {
            courseName: data.courseName,
            description: data.description || null,
            courseFees: data.courseFees,
            courseDuration: data.courseDuration,
            courseMode:data.courseMode
        };

        const result = await coursesService.addCourseService(courseTypePayload, coursePayload);

        return res.status(200).json({
            success: true,
            message: 'Course Added Successfully..!',
            courseTypeId: result.courseTypeId
        });

    } catch (error) {
        console.error('Add Course Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getCoursesWithTypeController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const result = await coursesService.getCoursesWithTypeService(page, limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getCoursesWithTypeByIdController=async(req,res)=>{
    try {
        const { id } = req.params;
        const result = await coursesService.getCoursesWithTypeByIdService(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Get Course By ID Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateCourseWithTypeService=async(req,res)=>{
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await coursesService.updateCourseWithTypeService(id, data);

        if (!result.affectedRows) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        return res.status(200).json({ success: true, message: "Course updated successfully" });
    } catch (error) {
        console.error('Update Course Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deleteCourseWithTypeService=async(req,res)=>{
    try{
        const {id}=req.params;

        const result=await coursesService.deleteCourseWithTypeService(id);
        if(!result.affectedRows){
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({success:true,message:"Course deleted successfully"})
    }catch (error) {
        console.error('Update Course Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    postCoursesController,
    getAllCoursesController,
    getByIdCourseController,
    updateCoursesController,
    deleteCoursesController,
    addCourseController,
    getCoursesWithTypeController,
    getCoursesWithTypeByIdController,
    updateCourseWithTypeService,
    deleteCourseWithTypeService
}