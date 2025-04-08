const express=require('express');
const router=express.Router();
const userCredentialsController = require('./userCredentialsController'); 

router.post('/userCredentials', userCredentialsController.postUserCredentialsController);
router.get('/userCredentials',userCredentialsController.getAllUserCredentialsController)


module.exports=router;