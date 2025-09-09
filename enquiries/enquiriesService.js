const dbConnection=require('../config/connection');

const postEnquiriesService=async(enquiriesData)=>{
    const query='INSERT INTO enquiries (name,email,mobileNo,enquirySource,courseId,pipeLinePhaseId,salesPersonId) VALUES (?,?,?,?,?,?,?)';
    const [result]=await dbConnection.query(query,
        [
            enquiriesData.name,
            enquiriesData.email,
            enquiriesData.mobileNo,
            enquiriesData.enquirySource,
            enquiriesData.courseId,
            enquiriesData.pipeLinePhaseId,
            enquiriesData.salesPersonId
        ]
    )
    return result;
}

const getAllEnquiriesService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM enquiries');
    return result;
}

const getByIdEnquiriesService=async(enquiriesId)=>{
    const [result]=await dbConnection.query('SELECT * FROM enquiries WHERE Id=?', [enquiriesId]);
    return result;
}

const updateEnquiriesService=async(enquiriesId,enquiriesData)=>{
    const enquiries={
        name:enquiriesData.name,
        email:enquiriesData.email,
        mobileNo:enquiriesData.mobileNo,
        enquirySource:enquiriesData.enquirySource,
        courseId:enquiriesData.courseId,
        pipeLinePhaseId:enquiriesData.pipeLinePhaseId,
        salesPersonId:enquiriesData.salesPersonId
    }

    const [result]=await dbConnection.query('UPDATE enquiries SET ? WHERE id=?', [enquiries,enquiriesId]);
    return result;
}

const deleteEnquiriesService=async(enquiriesId)=>{
    const [result]=await dbConnection.query('DELETE FROM enquiries WHERE id=?',[enquiriesId]);
    return result;
}

module.exports={
    postEnquiriesService,
    getAllEnquiriesService,
    getByIdEnquiriesService,
    updateEnquiriesService,
    deleteEnquiriesService
}