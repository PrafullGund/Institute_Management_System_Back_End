const dbConnection = require('../config/connection');

const postSyllabusService = async (syllabusData) => {
    const query = 'INSERT INTO syllabus (subjectId,sectionName,topicName,courseTypeId) VALUES (?,?,?,?)';
    const [result] = await dbConnection.query(query,
        [
            syllabusData.subjectId,
            syllabusData.sectionName,
            syllabusData.topicName,
            syllabusData.courseTypeId
        ]);
    return result;
}

const getAllSyllabusService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM syllabus');
    return result;
}

const getByIdSyllabusService=async(syllabusId)=>{
    const [result]=await dbConnection.query('SELECT * FROM syllabus WHERE Id=?',syllabusId);
    return result;
}

const updateSyllabusService=async(syllabusId,syllabusData)=>{
    const syllabus={
        subjectId:syllabusData.subjectId,
        sectionName:syllabusData.sectionName,
        topicName:syllabusData.topicName,
        courseTypeId:syllabusData.courseTypeId
    };
    const [result]=await dbConnection.query('UPDATE syllabus SET ? WHERE Id=?',[syllabus,syllabusId]);
    return result;
}

const deleteSyllabusService=async(syllabusId)=>{
    const [result]=await dbConnection.query('DELETE FROM syllabus WHERE Id=?',syllabusId);
    return result;
}

module.exports = {
    postSyllabusService,
    getAllSyllabusService,
    getByIdSyllabusService,
    updateSyllabusService,
    deleteSyllabusService
}