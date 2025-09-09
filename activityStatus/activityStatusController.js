const activityStatusJoi = require('../activityStatus/activityStatusJoi');
const activityStatusService = require('../activityStatus/activityStatusService');

const postActivityStatusController = async (req, res) => {

    try {
        const { error } = activityStatusJoi.activityStatusJoi.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await activityStatusService.postActivityStatusService(req.body);
        res.status(201).json({ success: true, message: 'Activity Status Added Successfully', data:result});

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllActivityStatusController = async (req, res) => {
    try{

        const result=await activityStatusService.getAllActivityStatusService();
        res.status(200).json({success:true,data:result});

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getActivityStatusByIdController=async(req,res)=>{
    try{
        const activityStatusId=req.params.id;
        const result=await activityStatusService.getActivityStatusByIdService(activityStatusId);

        if(result.length===0){
            res.status(404).json({success:false,message:'Activity Status Not Found'});
        }else{
            res.status(200).json({success:true,data:result[0]});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateActivityStatusService=async(req,res)=>{
    try{
        const activityStatusId=req.params.id;
        const activityStatusData=req.body;
        const result=await activityStatusService.updateActivityStatusService(activityStatusId,activityStatusData);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Activity Status Updated Successfully'});
        }else{
            res.status(404).json({success:false,message:'Activity Status Not Found'});
        }

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteActivityStatusController=async(req,res)=>{
    try{

        const activityStatusId=req.params.id;
        const result=await activityStatusService.deleteActivityStatusService(activityStatusId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Activity Status Deleted Successfully'});
        }else{
            res.status(404).json({success:false,message:'Activity Status Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postActivityStatusController,
    getAllActivityStatusController,
    getActivityStatusByIdController,
    updateActivityStatusService,
    deleteActivityStatusController
}