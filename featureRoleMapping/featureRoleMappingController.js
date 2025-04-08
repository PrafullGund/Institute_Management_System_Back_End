const featureRoleMappingService=require('../featureRoleMapping/featureRoleMappingService');

const postFeatureRoleMappingController=(req,res)=>{
    const featureRoleMappingData=req.body;
    featureRoleMappingService.postFeatureRoleMappingService(featureRoleMappingData,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message})
        }else{
            res.status(200).json({success:true,message:'Features Role Mapper Added Successfully'})
        }
    })
}

const getAllUserRoleMapperController=(req,res)=>{
    featureRoleMappingService.getAllFeatureRoleMappingService((error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message})
        }else{
            res.status(201).json({success:true,data:result})
        }
    })
}

module.exports={
    postFeatureRoleMappingController,
    getAllUserRoleMapperController
}