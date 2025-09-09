const userTypeJoi = require('../userType/userTypeJoi');
const userTypeService = require('../userType/userTypeService');

const postUserTypeController = async (req, res) => {
    try {
        const { error } = userTypeJoi.postUserTypeJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const userType = await userTypeService.postUserTypeService(req.body);
        res.status(201).json({ success:true ,message:'UserType Added Successfully', data: userType });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getAllUserTypeController = async (req, res) => {
    try {
        const userType = await userTypeService.getAllUserTypeService();
        res.status(200).json({ success: true, data: userType });
    } catch (err) {
        console.error('Error in getAllUserTypeController:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getUserTypeIdController = async (req, res) => {
    try {
        const userTypeId = req.params.id;
        const result = await userTypeService.getUserTypeIdService(userTypeId);

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'User Type Not Found' });
        }

        res.status(200).json({ success: true, data: result[0] });

    } catch (err) {
        console.error('Error in getUserTypeIdController:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateUserTypeController = async (req, res) => {
    try {
        const userTypeId = req.params.id;
        const userTypeData = req.body;

        const result = await userTypeService.updateUserTypeService(userTypeId, userTypeData);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'User Type Updated Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User Type Not Found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deleteUserTypeController=async (req,res)=>{
    try{
        const userTypeId=req.params.id;
        const result=await userTypeService.deleteUserTypeService(userTypeId);

        if(result.affectedRows > 0){
            res.status(200).json({success:true,message:'User Type Deleted Successfully'})
        }else{
            res.status(404).json({success:false,message:'User Type Not Found'})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postUserTypeController,
    getAllUserTypeController,
    getUserTypeIdController,
    updateUserTypeController,
    deleteUserTypeController
}