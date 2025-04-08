const bcrypt = require('bcrypt');
const userCredentialsService = require('../userCredentials/userCredentialsService');

const postUserCredentialsController = async (req, res) => {
    const { userId, email, mobile, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCredentialsData = { userId, email, mobile, password: hashedPassword };

        userCredentialsService.postUserCredentialsService(userCredentialsData, (error, result) => {
            if (error) {
                return res.status(500).json({ status: false, error: error.message });
            }
            res.status(200).json({ status: true, message: 'User Credentials Added Successfully' });
        });
    } catch (error) {
        res.status(500).json({ status: false, error: 'Error hashing the password' });
    }
}

const getAllUserCredentialsController=(req,res)=>{
    userCredentialsService.getAllUserCredentialsService((error,result)=>{
        if(error){
            res.status(500).json({status:false,message:error.message})
        }else{
            res.status(201).json({status:true, data:result})
        }
    })
}

module.exports = {
    postUserCredentialsController,
    getAllUserCredentialsController
}
