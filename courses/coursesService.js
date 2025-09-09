const dbConnection=require('../config/connection');

const postCoursesService=async(courseData)=>{
    const query='INSERT INTO courses (courseName,description,courseFees,courseDuration,courseTypeId) VALUES (?,?,?,?,?)';
    const [result]=await dbConnection.query(query,
        [
            courseData.courseName,
            courseData.description,
            courseData.courseFees,
            courseData.courseDuration,
            courseData.courseTypeId
        ]
    )
    return result;
}

const getAllCoursesService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM courses');
    return result;
}

const getByIdCourseService=async(coursesId)=>{
    const [result]=await dbConnection.query('SELECT * FROM courses WHERE Id=?',coursesId);
    return result;
}

const updateCoursesService=async(coursesId,courseData)=>{
    const courses={
        courseName:courseData.courseName,
        description:courseData.description,
        courseFees:courseData.courseFees,
        courseDuration:courseData.courseDuration,
        courseTypeId:courseData.courseTypeId
    }

    const [result]=await dbConnection.query('UPDATE courses SET ? WHERE Id=?',
        [courses,coursesId]
    );

    return result;
}

const deleteCoursesService=async (coursesId)=>{
    const [result]=await dbConnection.query('DELETE FROM courses WHERE Id=?',[coursesId]);
    return result;
}

module.exports={
    postCoursesService,
    getAllCoursesService,
    getByIdCourseService,
    updateCoursesService,
    deleteCoursesService
}