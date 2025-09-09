const activitiesJoi = require('../activities/activitiesJoi');
const activitiesService = require('../activities/activitiesService');

const postActivitiesController = async (req, res) => {
    try {

        const { error } = activitiesJoi.activitiesJoi.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await activitiesService.postActivitiesService(req.body);
        res.status(200).json({ success: true, message: 'Activities Added Successfully', data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllActivitiesController = async (req, res) => {
    try {

        const result = await activitiesService.getAllActivitiesService();
        res.status(201).json({ success: true, data: result });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdActivitiesController=async(req,res)=>{
    try{
        const activitiesId=req.params.id;
        const result=await activitiesService.getByIdActivitiesService(activitiesId);
        
        if(result.length===0){
            res.status(404).json({success:false,message:'Activities Not Found'});
        }else{
            res.status(201).json({success:true,data:result[0]});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateActivitiesController=async(req,res)=>{
    try{
        const activitiesId=req.params.id;
        const activitiesData=req.body;
        const result=await activitiesService.updateActivitiesService(activitiesId,activitiesData);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Activities Update Successfully'})
        }else{
            res.status(404).json({success:false,message:'Activities Not Found'})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteActivitiesController=async(req,res)=>{
    try{
        const activitiesId=req.params.id;
        const result=await activitiesService.deleteActivitiesService(activitiesId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Activities Delete Successfully'});
        }else{
            res.status(404).json({success:false,message:'Activities Not Found'})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postActivitiesController,
    getAllActivitiesController,
    getByIdActivitiesController,
    updateActivitiesController,
    deleteActivitiesController
}
