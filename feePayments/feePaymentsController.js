const feePaymentsService = require('../feePayments/feePaymentsService');

const postFeePaymentsController = async (req, res) => {
    try {
        const result = await feePaymentsService.postFeePaymentsService(req.body);
        res.status(200).json({ success: true, message: 'Fee Payment Added Successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllFeePaymentController = async (req, res) => {
    try {
        const result = await feePaymentsService.getAllFeePaymentService();
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'No Fee Payments Found' });
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getByIdFeePaymentsController = async (req, res) => {
    try {
        const feePaymentsId = req.params.id;
        const result = await feePaymentsService.getByIdFeePaymentsService(feePaymentsId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'No Fee Payments Found' });
        } else {
            res.status(201).json({ success: true, data: result[0] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateFeePaymentController=async(req,res)=>{
    try{
        const feePaymentsId=req.params.id;
        const feePaymentsData=req.body;
        const result=await feePaymentsService.updateFeePaymentService(feePaymentsId,feePaymentsData);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Fee Payments Updated Successfully'})
        }else{
            res.status(404).json({success:false,message:'No Fee Payments Found'});
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const deleteFeePaymentController=async(req,res)=>{
    try{
        const feePaymentsId=req.params.id;
        const result=await feePaymentsService.deleteFeePaymentService(feePaymentsId);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Fee Payments Deleted Successfully'})
        }else{
            res.status(404).json({success:false,message:'No Fee Payments Found'});
        }
    }catch(error){
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports = {
    postFeePaymentsController,
    getAllFeePaymentController,
    getByIdFeePaymentsController,
    updateFeePaymentController,
    deleteFeePaymentController
}