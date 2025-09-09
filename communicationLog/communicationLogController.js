const communicationLogService = require('../communicationLog/communicationLogService');

const postCommunicationLogController = async (req, res) => {
    try {
        const result = communicationLogService.postCommunicationLogService(req.body);
        res.status(201).json({ success: true, message: 'Communication Log Added Successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllCommunicationLogController = async (req, res) => {
    try {
        const result = await communicationLogService.getAllCommunicationLogService();
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getByIdCommunicationLogController = async (req, res) => {
    try {
        const communicationLogId = req.params.id;
        const result = await communicationLogService.getByIdCommunicationLogService(communicationLogId);

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Communication Log Not Found' })
        } else {
            res.status(201).json({ success: true, data: result[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateCommunicationLogController = async (req, res) => {
    try {
        const communicationLogId = req.params.id;
        const communicationLog = req.body;
        const result = await communicationLogService.updateCommunicationLogService(communicationLogId, communicationLog);

        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Communication Log Update Successfully', data: result });
        } else {
            res.status(404).json({ success: false, message: 'Communication Log Not Found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteCommunicationLogController=async(req,res)=>{
    try{
        const communicationLogId=req.params.id;
        const result=await communicationLogService.deleteCommunicationLogService(communicationLogId);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Communication Log Deleted Successfully'});
        }else{
            res.status(404).json({success:false,message:'Communication Log Not Found'})
        }
    }catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postCommunicationLogController,
    getAllCommunicationLogController,
    getByIdCommunicationLogController,
    updateCommunicationLogController,
    deleteCommunicationLogController
}