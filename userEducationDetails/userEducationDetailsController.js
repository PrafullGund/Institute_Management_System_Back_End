const userEducationDetailsJoi=require('../userEducationDetails/userEducationDetailsJoi');
const userEducationDetailsService=require('../userEducationDetails/userEducationDetailsService');

const postUserEducationController=async (req,res)=>{
    try{
        const {error}=userEducationDetailsJoi.userEducationDetailsJoi.validate(req.body);
          if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result=await userEducationDetailsService.postUserEducationService(req.body);
        res.status(201).json({success:true,message:'User Education Added Successfully',data:result});

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllEducationDetailsController=async (req,res)=>{
    try{
        const result=await userEducationDetailsService.getAllEducationDetailsService();
        res.status(200).json({success:true,data:result});
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllEducationDetailsByIdController=async (req,res)=>{
    try{
        const userEducationDetailsId=req.params.id;

        const result=await userEducationDetailsService.getEducationDetailsByIdService(userEducationDetailsId);
        if(result.length===0){
            res.status(404).json({success:false,message:'User Education Details Not Found'});
        }
        else{
            res.status(200).json({success:true,data:result});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateEducationDetailsController=async (req,res)=>{
    try{
        const educationDetailsId=req.params.id;
        const educationDetailsData=req.body;

        const result=await userEducationDetailsService.updateEducationDetailsService(educationDetailsId,educationDetailsData);
        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Education Details Updated Successfully',data:result});
        }else{
            res.status(404).json({success:false,message:'Education Details Not Found'})
        }

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteEducationDetailsController=async (req,res)=>{
    try{
        const userEducationDetailsId=req.params.id;
        const result=await userEducationDetailsService.deleteEducationDetailsService(userEducationDetailsId);
        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'User Education Details Delete Successfully'})
        }else{
            res.status(404).json({success:false,message:'User Education Details Not Found'});
        }

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports={
    postUserEducationController,
    getAllEducationDetailsController,
    getAllEducationDetailsByIdController,
    updateEducationDetailsController,
    deleteEducationDetailsController
}
