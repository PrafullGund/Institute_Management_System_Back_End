const featureRoleMappingJoi = require('../featureRoleMapping/featureRoleMappingJoi');
const featureRoleMappingService = require('../featureRoleMapping/featureRoleMappingService');

const postFeatureRoleMappingController = async (req, res) => {
    try {
        const { error } = featureRoleMappingJoi.featureRoleMappingJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result=await featureRoleMappingService.postFeatureRoleMappingService(req.body);
        res.status(201).json({success:true,message:'Feature Role Mapping Added Successfully',data:result});


    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllFeatureRoleMappingController=async(req,res)=>{
    try{
        const result=await featureRoleMappingService.getAllFeatureRoleMappingService();
        res.status(200).json({success:true,data:result});

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getFeatureRoleMappingByIdController=async (req,res)=>{
    try{
        const featureRoleMappingId=req.params.id;
        const result=await featureRoleMappingService.getFeatureRoleMappingByIdService(featureRoleMappingId);

        if(result.length===0){
            res.status(404).json({success:false,message:'Feature Role Mapping Not Found'});
        }else{
            res.status(200).json({success:true,data:result[0]});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateFeatureRoleMappingController=async(req,res)=>{
    try{
        const featureRoleMappingId=req.params.id;
        const featureRoleMappingData=req.body;
        const result=await featureRoleMappingService.updateFeatureRoleMappingService(featureRoleMappingId,featureRoleMappingData);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Feature Role Mapping Updated Successfully',data:result});
        }else{
            res.status(404).json({success:false,message:'Feature Role Mapping Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteFeatureRoleMappingController=async(req,res)=>{
    try{
        const featureRoleMappingId=req.params.id;
        const result=await featureRoleMappingService.deleteFeatureRoleMappingService(featureRoleMappingId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Feature Role Mapping Deleted Successfully'})
        }
        else{
            res.status(404).json({success:false,message:'Feature Role Mapping Not Found'})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postFeatureRoleMappingController,
    getAllFeatureRoleMappingController,
    getFeatureRoleMappingByIdController,
    updateFeatureRoleMappingController,
    deleteFeatureRoleMappingController
}

