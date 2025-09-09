const courseSubjectMappingService = require('../courseSubjectMapping/courseSubjectMappingService');

const postCourseSubjectMappingController = async (req, res) => {
    try {
        const result=await courseSubjectMappingService.postCourseSubjectMappingService(req.body);
        res.status(201).json({success:true,message:'Course Subject Mapping Added'})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getAllCourseSubjectMappingController=async(req,res)=>{
    try{
        const result=await courseSubjectMappingService.getAllCourseSubjectMappingService();
        res.status(200).json({success:true,data:result});
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const getByIdCourseSubjectMappingController=async(req,res)=>{
    try{
        const courseSubjectMappingId=req.params.id;
        const result=await courseSubjectMappingService.getByIdCourseSubjectMappingService(courseSubjectMappingId);

        if(result.length===0){
            res.status(404).json({success:false,message:'Course Subject Mapping Not Found'});
        }else{
            res.status(200).json({success:true,data:result[0]});
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const updateCourseSubjectMappingController=async(req,res)=>{
    try{
        const courseSubjectMappingId=req.params.id;
        const courseSubjectMappingData=req.body;

        const result=await courseSubjectMappingService.updateCourseSubjectMappingService(courseSubjectMappingId,courseSubjectMappingData);
        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Course Subject Mapping Update Successfully'});
        }else{
            res.status(404).json({success:false,message:'Course Subject Mapping Not Found'})
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const deleteCourseSubjectMappingController=async(req,res)=>{
    try{
        const courseSubjectMappingId=req.params.id;
        const result=await courseSubjectMappingService.deleteCourseSubjectMappingService(courseSubjectMappingId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Course Subject Mapping Delete Successfully'})
        }else{
            res.status(404).json({success:false,message:'Course Subject Mapping Not Found'})
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports = {
    postCourseSubjectMappingController,
    getAllCourseSubjectMappingController,
    getByIdCourseSubjectMappingController,
    updateCourseSubjectMappingController,
    deleteCourseSubjectMappingController
}