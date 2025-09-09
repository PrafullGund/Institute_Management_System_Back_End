const syllabusService = require('../syllabus/syllabusService');

const postSyllabusController = async (req, res) => {
    try {
        const result = syllabusService.postSyllabusService(req.body);
        res.status(201).json({ success: true, message: 'Syllabus Added Successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getAllSyllabusController = async (req, res) => {
    try {
        const result = await syllabusService.getAllSyllabusService();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getByIdSyllabusController = async (req, res) => {
    try {
        const syllabusId = req.params.id;
        const result = await syllabusService.getByIdSyllabusService(syllabusId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Syllabus Not Found' });
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateSyllabusController = async (req, res) => {
    try {
        const syllabusId = req.params.id;
        const syllabusData = req.body;
        const result = await syllabusService.updateSyllabusService(syllabusId, syllabusData);

        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, data: result, message: 'Syllabus Update Successfully' })
        } else {
            res.status(404).json({ success: false, message: 'Syllabus Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteSubjectController=async(req,res)=>{
    try{
        const syllabusId=req.params.id;
        const result=await syllabusService.deleteSyllabusService(syllabusId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Syllabus Deleted Successfully'})
        }else{
            res.status(404).json({success:false,message:'Syllabus Not Found'})
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports = {
    postSyllabusController,
    getAllSyllabusController,
    getByIdSyllabusController,
    updateSyllabusController,
    deleteSubjectController
}