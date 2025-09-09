const subjectsService = require('../subjects/subjectsService');

const postSubjectsController = async (req, res) => {
    try {
        const result = await subjectsService.postSubjectsService(req.body);
        res.status(200).json({ success: true, message: 'Subject Added Successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getAllSubjectsController = async (req, res) => {
    try {
        const result = await subjectsService.getAllSubjectsService();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getByIdSubjectsController = async (req, res) => {
    try {
        const subjectsId = req.params.id;
        const result = await subjectsService.getByIdSubjectsService(subjectsId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Subject Not Found' });
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateSubjectController = async (req, res) => {
    try {
        const subjectsId = req.params.id;
        const subjectsData = req.body;
        const result = await subjectsService.updateSubjectService(subjectsId, subjectsData);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Subjects Update Successfully', data: result });
        } else {
            res.status(404).json({ success: false, message: 'Subjects Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteEnquiriesController=async(req,res)=>{
    try{
        const subjectsId=req.params.id;
        const result=await subjectsService.deleteSubjectService(subjectsId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Subject Deleted Successfully'});
        }else{
            res.status(404).json({success:false,message:'Subject Not Found'});
        }
    } catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports = {
    postSubjectsController,
    getAllSubjectsController,
    getByIdSubjectsController,
    updateSubjectController,
    deleteEnquiriesController
}