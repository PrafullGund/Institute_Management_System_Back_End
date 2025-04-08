const roleService=require('../roles/roleService');

const postRoleController = (req, res) => {
    const roleData = req.body;
    
    roleService.postRoleService(roleData, (error, result) => {  
        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        res.status(200).json({ success: true, message: 'Role Added Successfully' });
    });
};

const getAllRoleController=(req,res)=>{
    roleService.getAllRoleService((error,result)=>{
        if(error){
            return res.status(500).json({success:false,message:error.message})
        }else{
            res.status(201).json({success:true,data:result})
        }
    })
}


module.exports={
    postRoleController,
    getAllRoleController
}