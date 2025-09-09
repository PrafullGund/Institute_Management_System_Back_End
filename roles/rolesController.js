const rolesJoi = require('../roles/rolesJoi');
const rolesService = require('../roles/rolesService');

const postRoleController = async (req, res) => {
    try {
        const { error } = rolesJoi.rolesJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result=await rolesService.postRoleService(req.body);
        res.status(200).json({success:true,message:'Roles Added Successfully',data:result});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllRolesController=async (req,res)=>{
    try{
        const result=await rolesService.getAllRoleService();
        res.status(201).json({success:true,data:result});

    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getRolesByIdController=async (req,res)=>{
    try{
        const rolesId=req.params.id;
        const result=await rolesService.getRolesByIdService(rolesId);
        
        if(result.length===0){
            res.status(404).json({success:false,message:'Roles Not Found'});
        }else{
            res.status(201).json({success:true,data:result[0]})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateRolesController=async (req,res)=>{
    try{
        const rolesId=req.params.id;
        const rolesData=req.body;

        const result=await rolesService.updateRolesService(rolesId,rolesData);
        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'Roles Updated Successfully', data:result});
        }else{
            res.status(404).json({success:false,message:'Roles Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteRolesController=async(req,res)=>{
    try{
        const rolesId=req.params.id;
        const result=await rolesService.deleteRolesService(rolesId);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Roles Delete Successfully'});
        }else{
            res.status(404).json({success:false,message:'Roles Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postRoleController,
    getAllRolesController,
    getRolesByIdController,
    updateRolesController,
    deleteRolesController
}

