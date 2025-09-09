const express=require('express');
const router=express.Router();
const userCredentialsController=require('../userCredentials/userCredentialsController');

router.post('/userCredentials',userCredentialsController.postUserCredentialsController);
router.get('/userCredentials/getAll',userCredentialsController.getAllUserCredentialsController);
router.get('/userCredentials/getById/:id',userCredentialsController.getUserCredentialsByIdController);
router.put('/userCredentials/update/:id',userCredentialsController.updateUserCredentialsController);
router.delete('/userCredentials/delete/:id',userCredentialsController.deleteUserCredentialsController);

module.exports=router;