const userJoi = require('../user/userJoi');
const userService = require('../user/userService');

const postUserController = async (req, res) => {
    try {
        const { error } = userJoi.userJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const user = await userService.postUserService(req.body);
        res.status(201).json({ success: 'User Added Successfully', data: user });
        
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllUserController=async(req,res)=>{
    try{
        const user=await userService.getAllUserService();
        res.status(200).json({success:true,data:user});
    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
}

const getUserByIdController=async(req,res)=>{
    try{
        const userId=req.params.id;
        const result=await userService.getUserByIdService(userId);

        if(result.length===0){
            return res.status(404).json({success:false,message:'User Not Found'});
        }else{
            res.status(200).json({success:true,data:result[0]});
        }
    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
}

const updateUserController=async(req,res)=>{
    try{
        const userId=req.params.id;
        const userData=req.body;

        const result=await userService.updateUserService(userId, userData);
        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'User Update Successfully',data:result})
        }else{
            res.status(404).json({success:false,message:'User Not Found'});
        }

    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const deleteUserController=async(req,res)=>{
    try{
        const userId=req.params.id;
        const result=await userService.deleteUserService(userId);

        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'User Deleted Successfully'});
        }else{
            res.status(404).json({success:false,message:'User Not Found'});
        }

    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}
const { authenticationService } = require('../authentication/authenticationService');

const signIn=async(req,res)=>{
    try{
        const data=req.body;
        const result=await authenticationService.signIn(req,res);
        res.json(result);
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}


module.exports = {
    postUserController,
    getAllUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    signIn
}
 

