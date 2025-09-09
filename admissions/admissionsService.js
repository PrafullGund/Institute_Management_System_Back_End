const dbConnection = require('../config/connection');

const postAdmissionsService = async (admissionsData) => {
    const query = 'INSERT INTO admissions (enquiryId,admissionDate,description,status) VALUES (?,?,?,?)';
    const [result] = await dbConnection.query(query,
        [
            admissionsData.enquiryId,
            admissionsData.admissionDate,
            admissionsData.description,
            admissionsData.status
        ]);
    return result;
}

const getAllAdmissionsService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM admissions');
    return result;
}

const getByIdAdmissionsService = async (admissionsId) => {
    const [result] = await dbConnection.query('SELECT * FROM admissions WHERE Id=?', admissionsId);
    return result;
}

const updateAdmissionsService=async(admissionsId,admissionsData)=>{
    const admissions={
        enquiryId:admissionsData.enquiryId,
        admissionDate:admissionsData.admissionDate,
        description:admissionsData.description,
        status:admissionsData.status
    };
    const [result]=await dbConnection.query('UPDATE admissions SET ? WHERE Id=?',[admissionsId,admissions]);
    return result;
}

const deleteAdmissionsService=async(admissionsId)=>{
    const [result]=await dbConnection.query('DELETE FROM admissions WHERE Id=?',admissionsId);
    return result;
}

module.exports = {
    postAdmissionsService,
    getAllAdmissionsService,
    getByIdAdmissionsService,
    updateAdmissionsService,
    deleteAdmissionsService
}