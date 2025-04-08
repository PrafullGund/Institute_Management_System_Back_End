const { authenticationService } = require('../authentication/authenticationService');
const usersService=require('../users/usersService');

const signIn=async(req,res)=>{
    try{
        const data=req.body;
        const result=await authenticationService.signIn(req,res);
        res.json(result);
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const postUsersController=(req,res)=>{
    const usersData=req.body;
    usersService.postUserService(usersData,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message})
        }else{
            res.status(201).json({success:true,message:'Users Added Successfully'})
        }
    })
}

const getAllUsersController=(req,res)=>{
    usersService.getAllUsersService((error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message});
        }else{
            res.status(200).json({success:true,data:result});
        }
    })
}

const getByIdUsersController=(req,res)=>{
    const usersId=req.params.id;
    usersService.getByIdUsersService(usersId,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message});
        }else{
            if(result.length===0){
                res.status(400).json({success:false,message:'Users Not Found'});
            }else{
                res.status(201).json({success:true,data:result[0]});
            }
        }
    })
}

const updateUsersController=(req,res)=>{
    const usersId=req.params.id;
    const usersData=req.body;
    usersService.updateUsersService(usersId,usersData,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message});
        }else{
            if(result.affectedRows>0){
                res.status(201).json({success:true,message:'Users Update Successfully'});
            }else{
                res.status(404).json({success:false,message:'Users Not Found'});
            }
        }
    })
}

const deleteUsersController=(req,res)=>{
    const usersId=req.params.id;
    usersService.deleteUsersService(usersId,(error,result)=>{
        if(error){
            res.status(500).json({success:false,message:error.message});
        }else{
            if(result.affectedRows>0){
                res.status(201).json({success:true,message:'Users Delete Successfully'});
            }else{
                res.status(404).json({success:false,message:'Users Not Found'});
            }
        }
    })
}

module.exports={
    postUsersController,
    getAllUsersController,
    getByIdUsersController,
    updateUsersController,
    deleteUsersController,
    signIn
}