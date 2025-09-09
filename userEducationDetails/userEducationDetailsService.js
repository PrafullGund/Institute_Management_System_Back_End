const dbConnection=require('../config/connection');

const postUserEducationService=async (userEducationDetailsData)=>{
    const query='INSERT INTO userEducationDetails (userId,educationTitle,description,passingYear) VALUES (?,?,?,?)';

    const result=await dbConnection.query(query,[
        userEducationDetailsData.userId,
        userEducationDetailsData.educationTitle,
        userEducationDetailsData.description,
        userEducationDetailsData.passingYear
    ])
    return result
}

const getAllEducationDetailsService=async ()=>{
    const [result]=await dbConnection.query('SELECT * FROM userEducationDetails');
    return result;
}

const getEducationDetailsByIdService=async(educationDetailsId)=>{
    const [result]=await dbConnection.query('SELECT * FROM userEducationDetails WHERE id=?',[educationDetailsId]);
    return result;
}

const updateEducationDetailsService=async (educationDetailsId,educationDetailsData)=>{
    const educationDetails={
        userId:educationDetailsData.userId,
        educationTitle:educationDetailsData.educationTitle,
        description:educationDetailsData.description,
        passingYear:educationDetailsData.passingYear
    }

    const [result]=await dbConnection.query(
        `UPDATE userEducationDetails SET ? WHERE id=?`,
        [educationDetails,educationDetailsId]
    )
    return result;
}

const deleteEducationDetailsService=async(educationDetailsId)=>{
    const [result]=await dbConnection.query('DELETE FROM userEducationDetails WHERE id=?',[educationDetailsId]);
    return result;
}

module.exports={
    postUserEducationService,
    getAllEducationDetailsService,
    getEducationDetailsByIdService,
    updateEducationDetailsService,
    deleteEducationDetailsService
}
