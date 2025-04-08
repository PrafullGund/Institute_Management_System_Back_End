const userRoleMapperService=require('../userRoleMapper/userRoleMapperService');

const postUserRoleMapperController=(req,res)=>{
    const userRoleMapperData=req.body;
    userRoleMapperService.postUserRoleMapperService(userRoleMapperData,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message})
        }else{
            res.status(200).json({success:true,message:'User Role Mapper Added Successfully'})
        }
    })
}

const getAllUserRoleMapperController=(req,res)=>{
    userRoleMapperService.getAllUserRoleMapperService((error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message})
        }else{
            res.status(201).json({success:true,data:result})
        }
    })
}

module.exports={
    postUserRoleMapperController,
    getAllUserRoleMapperController
}