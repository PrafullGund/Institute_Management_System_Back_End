const admissionsService = require('../admissions/admissionsService');

const postAdmissionsController = async (req, res) => {
    try {
        const result = await admissionsService.postAdmissionsService(req.body);
        res.status(201).json({ success: true, message: 'Admissions Added Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllAdmissionsController = async (req, res) => {
    try {
        const result = await admissionsService.getAllAdmissionsService();
        res.status(201).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdAdmissionsController=async(req,res)=>{
    try{
        const admissionsId=req.params.id;
        const result=await admissionsService.getByIdAdmissionsService(admissionsId);

        if(result.length===0){
            res.status(404).json({success:false,message:'Admission Not Found'});
        }else{
            res.status(201).json({success:true,data:result[0]});
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const updateAdmissionsController=async(req,res)=>{
    try{
        const admissionsId=req.params.id;
        const admissionsData=req.body;
        const result=await admissionsService.updateAdmissionsService(admissionsId,admissionsData);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Admissions Updated Successfully',data:result});
        }else{
            res.status(404).json({success:false,message:'Admissions Not Found'})
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const deleteAdmissionsController=async(req,res)=>{
    try{
        const admissionsId=req.params.id;
        const result=await admissionsService.deleteAdmissionsService(admissionsId);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Admissions Deleted Successfully'})
        }else{
            res.status(404).json({success:false,message:'Admissions Not Found'})
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports = {
    postAdmissionsController,
    getAllAdmissionsController,
    getByIdAdmissionsController,
    updateAdmissionsController,
    deleteAdmissionsController
}