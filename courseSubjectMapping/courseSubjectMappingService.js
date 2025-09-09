const dbConnection=require('../config/connection');

const postCourseSubjectMappingService=async (courseSubjectMappingData)=>{
    const query='INSERT INTO courseSubjectMapping (courseId,subjectId) VALUES (?,?)';
    const [result]=await dbConnection.query(query,
        [
            courseSubjectMappingData.courseId,
            courseSubjectMappingData.subjectId
        ]
    )
    return result;
}

const getAllCourseSubjectMappingService=async ()=>{
    const [result]=await dbConnection.query('SELECT * FROM courseSubjectMapping');
    return result;
}

const getByIdCourseSubjectMappingService=async(courseSubjectMappingId)=>{
    const [result]=await dbConnection.query('SELECT * FROM courseSubjectMapping WHERE id=?',courseSubjectMappingId);
    return result;
}

const updateCourseSubjectMappingService=async(courseSubjectMappingId,courseSubjectMappingData)=>{
    const courseSubjectMapping={
        courseId:courseSubjectMappingData.courseId,
        subjectId:courseSubjectMappingData.subjectId
    };

    const [result]=await dbConnection.query('UPDATE courseSubjectMapping SET ? WHERE Id',
        [courseSubjectMapping,courseSubjectMappingId]
    );
    return result;
}

const deleteCourseSubjectMappingService=async(courseSubjectMappingId)=>{
    const [result]=await dbConnection.query('DELETE FROM courseSubjectMapping WHERE Id=?', [courseSubjectMappingId]);
    return result;
}

module.exports={
    postCourseSubjectMappingService,
    getAllCourseSubjectMappingService,
    getByIdCourseSubjectMappingService,
    updateCourseSubjectMappingService,
    deleteCourseSubjectMappingService
}