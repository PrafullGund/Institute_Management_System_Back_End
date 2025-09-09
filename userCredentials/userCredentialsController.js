const userCredentialsJoi=require('../userCredentials/userCredentialsJoi');
const userCredentialsService=require('../userCredentials/userCredentialsService');

const postUserCredentialsController = async (req, res) => {
    try {
        const { error } = userCredentialsJoi.userCredentialsJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const userCredentials = await userCredentialsService.postUserCredentialsService(req.body);
        res.status(201).json({ success: 'User Credentials Added Successfully', data: userCredentials });

    } catch (err) {
        console.error('Error in postUserCredentialsController:', err); 
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAllUserCredentialsController=async (req,res)=>{
    try{
        const userCredentials=await userCredentialsService.getAllUserCredentialsService();
        res.status(200).json({success:true,data:userCredentials});
    }catch (err) {
        console.error('Error in getAllUserCredentialsController:', err); 
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getUserCredentialsByIdController=async (req,res)=>{
    try{

        const userCredentialsId=req.params.id;
        const result=await userCredentialsService.getUserCredentialsByIdService(userCredentialsId);

        if(result.length===0){
            return res.status(404).json({success:false,message:'User Credentials Not Found'});
        }else{
            res.status(201).json({success:true,data:result[0]}); 
        }

    }catch (err) {
        console.error('Error in getByIdUserCredentialsController:', err); 
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateUserCredentialsController=async (req,res)=>{
    try{
        const userCredentialsId=req.params.id;
        const userCredentialsData=req.body;

        const result=await userCredentialsService.updateUserCredentialsService(userCredentialsId,userCredentialsData);
        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'User Credentials Update Successfully'})
        }else{
            res.status(404).json({success:false,message:'User Credentials Not Found'})
        }
    }catch(err){
        console.error('Error in updateUserCredentialsController:', err); 
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteUserCredentialsController=async (req,res)=>{
    try{
        const userCredentialsId=req.params.id;
        const result=await userCredentialsService.deleteUserCredentialsService(userCredentialsId);
        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'User Credentials Delete Successfully'})
        }else{
            res.status(404).json({success:false,message:'User Credentials Not Found'});
        }
    }catch(err){
        console.error('Error in deleteUserCredentialsController:', err); 
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports={
    postUserCredentialsController,
    getAllUserCredentialsController,
    getUserCredentialsByIdController,
    updateUserCredentialsController,
    deleteUserCredentialsController
}