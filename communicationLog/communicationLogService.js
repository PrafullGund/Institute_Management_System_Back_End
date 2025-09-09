const dbConnection = require('../config/connection');

const postCommunicationLogService = async (communicationLogData) => {
    const query = 'INSERT INTO communicationLog (enquiryId,customerId,activityId,activityStatusId,salesRepresentativeId,communicationDate,communicationDetails) VALUES (?,?,?,?,?,?,?)';
    const [result] = await dbConnection.query(query,
        [
            communicationLogData.enquiryId,
            communicationLogData.customerId,
            communicationLogData.activityId,
            communicationLogData.activityStatusId,
            communicationLogData.salesRepresentativeId,
            communicationLogData.communicationDate,
            communicationLogData.communicationDetails
        ]
    )
    return result;
}

const getAllCommunicationLogService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM communicationLog');
    return result;
}

const getByIdCommunicationLogService = async (communicationLogId) => {
    const [result] = await dbConnection.query('SELECT * FROM communicationLog WHERE Id=?', communicationLogId);
    return result;
}

const updateCommunicationLogService=async(communicationLogId,communicationLogData)=>{
    const communicationLog={
        enquiryId:communicationLogData.enquiryId,
        customerId:communicationLogData.customerId,
        activityId:communicationLogData.activityId,
        activityStatusId:communicationLogData.activityStatusId,
        salesRepresentativeId:communicationLogData.salesRepresentativeId,
        communicationDate:communicationLogData.communicationDate,
        communicationDetails:communicationLogData.communicationDetails
    }

    const [result]=await dbConnection.query(`UPDATE communicationLog SET ? WHERE Id=?`,[communicationLog,communicationLogId]);
    return result;
}

const deleteCommunicationLogService=async(communicationLogId)=>{
    const [result]=await dbConnection.query('DELETE FROM communicationLog WHERE Id=?', [communicationLogId]);
    return result;
}

module.exports = {
    postCommunicationLogService,
    getAllCommunicationLogService,
    getByIdCommunicationLogService,
    updateCommunicationLogService,
    deleteCommunicationLogService
}