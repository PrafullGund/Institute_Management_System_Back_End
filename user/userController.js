const userJoi = require('../user/userJoi');
const { authenticationService } = require('../authentication/authenticationService');
const userService = require('../user/userService');
const userCredentialsService = require('../userCredentials/userCredentialsService');
const userAddressService = require('../userAddress/userAddressService');
const userEducationService = require('../userEducationDetails/userEducationDetailsService');

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

const signIn=async(req,res)=>{
    try{
        const data=req.body;
        const result=await authenticationService.signIn(req,res);
        res.json(result);
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const logout = async (req, res) => {
    try {
        await authenticationService.logout(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const data = req.body;

        const requiredFields = [
            'firstName','lastName','dob','userTypeId',
            'email','mobile','password','addressLineOne','country',
            'state','city','postalCode','educationTitle','passingYear'
        ];

        const missing = requiredFields.filter(f => !data[f]);
        if (missing.length) return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(', ')}` });

        const userPayload = { firstName: data.firstName, lastName: data.lastName, dob: data.dob, userTypeId: data.userTypeId };
        const credentialsPayload = { email: data.email, mobile: data.mobile, password: data.password };
        const addressPayload = { addressLineOne: data.addressLineOne, addressLineTwo: data.addressLineTwo || '', country: data.country, state: data.state, city: data.city, postalCode: data.postalCode };
        const educationPayload = { educationTitle: data.educationTitle, description: data.description || '', passingYear: data.passingYear };

        const result = await userService.addUserService(userPayload, credentialsPayload, addressPayload, educationPayload);
        return res.status(200).json({ success: true, message: 'User added successfully', userId: result.userId });

    } catch (error) {
        console.error('Add User Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAllRegisterUsersController = async (req, res) => {
    try {
        const users = await userService.getAllRegisterUsersService();
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Get All Users Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getRegisterUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userService.getRegisterUserByIdService(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Get User By ID Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateRegisterUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        const userPayload = {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            userTypeId: data.userTypeId
        };
        const credentialsPayload = {
            email: data.email,
            mobile: data.mobile,
            password: data.password
        };
        const addressPayload = {
            addressLineOne: data.addressLineOne,
            addressLineTwo: data.addressLineTwo || '',
            country: data.country,
            state: data.state,
            city: data.city,
            postalCode: data.postalCode
        };
        const educationPayload = {
            educationTitle: data.educationTitle,
            description: data.description || '',
            passingYear: data.passingYear
        };

        const result = await userService.updateRegisterUserService(userId, userPayload, credentialsPayload, addressPayload, educationPayload);
        return res.status(200).json({ success: true, message: 'User updated successfully', userId: result.userId });

    } catch (error) {
        console.error('Update User Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteRegisterUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.deleteUserService(userId);
        return res.status(200).json({ success: true, message: 'User deleted successfully', userId });
    } catch (error) {
        console.error('Delete User Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    postUserController,
    getAllUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    signIn,
    addUser,
    getAllRegisterUsersController,
    getRegisterUserByIdController,
    updateRegisterUserController,
    deleteRegisterUserController,
    logout
}
