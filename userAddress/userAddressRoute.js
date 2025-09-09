const express=require('express');
const router=express.Router();
const userAddressController=require('../userAddress/userAddressController');

router.post('/userAddress/post',userAddressController.postUserCredentialsController);
router.get('/userAddress/getAll',userAddressController.getAllUserAddressController);
router.get('/userAddress/getById/:id',userAddressController.getUserAddressByIdController);
router.put('/userAddress/update/:id',userAddressController.updateUserAddressController);
router.delete('/userAddress/delete/:id',userAddressController.deleteUserAddressController);

module.exports=router;