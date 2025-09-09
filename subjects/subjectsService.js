const dbConnection=require('../config/connection');

const postSubjectsService=async(subjectsData)=>{
    const query='INSERT INTO subjects (subjectName,description) VALUES (?,?)';
    const [result]=await dbConnection.query(query,
        [
            subjectsData.subjectName,
            subjectsData.description
        ]
    )
    return result;
}

const getAllSubjectsService=async ()=>{
    const [result]=await dbConnection.query('SELECT * FROM subjects');
    return result;
}

const getByIdSubjectsService=async(subjectsId)=>{
    const [result]=await dbConnection.query('SELECT * FROM subjects WHERE Id=?',subjectsId);
    return result;
}

const updateSubjectService=async(subjectsId,subjectsData)=>{
    const subjects={
        subjectName:subjectsData.subjectName,
        description:subjectsData.description
    }
    const result=await dbConnection.query('UPDATE subjects SET ? WHERE Id=?',[subjects, subjectsId]);
    return result;
}

const deleteSubjectService=async (subjectsId)=>{
    const [result]=await dbConnection.query('DELETE FROM subjects WHERE Id=?',subjectsId);
    return result;
}

module.exports={
    postSubjectsService,
    getAllSubjectsService,
    getByIdSubjectsService,
    updateSubjectService,
    deleteSubjectService
}