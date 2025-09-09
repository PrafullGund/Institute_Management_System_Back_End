const userAddressJoi = require('../userAddress/userAddressJoi');
const userAddressesService = require('../userAddress/userAddressService');

const postUserCredentialsController = async (req, res) => {
    try {
        const { error } = userAddressJoi.userAddressJoi.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const userAddress = await userAddressesService.postUserCredentialsService(req.body);
        res.status(201).json({ success: true, message: 'User Address Added Successfully', data: userAddress });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllUserAddressController = async (req, res) => {
    try {
        const userAddress = await userAddressesService.getAllUserAddressService();
        res.status(200).json({ success: true, data: userAddress });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getUserAddressByIdController = async (req, res) => {
    try {
        const userAddressId = req.params.id;
        const result = await userAddressesService.getUserAddressByIdService(userAddressId);

        if (result.length === 0) {

            res.status(404).json({ success: false, message: 'User Address Not Found' })
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateUserAddressController=async (req,res)=>{
    try{
        const userAddressId=req.params.id;
        const userAddressData=req.body;

        const result=await userAddressesService.updateUserAddressService(userAddressId,userAddressData);
        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'User Address Update Successfully',data:result});
        }else{
            res.status(404).json({success:false,message:'user Address Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteUserAddressController=async (req,res)=>{
    try{
        const userAddressId=req.params.id;
        const result=await userAddressesService.deleteUserAddressService(userAddressId);
        if(result.affectedRows>0){
            res.status(200).json({success:true,message:'User Address Delete Successfully'});
        }else{
            res.status(404).json({success:false,message:'User Address Not Found'});
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postUserCredentialsController,
    getAllUserAddressController,
    getUserAddressByIdController,
    updateUserAddressController,
    deleteUserAddressController
}