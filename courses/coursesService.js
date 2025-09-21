const dbConnection = require('../config/connection');

const postCoursesService = async (courseData) => {
    const query = 'INSERT INTO courses (courseName,description,courseFees,courseDuration,courseTypeId) VALUES (?,?,?,?,?)';
    const [result] = await dbConnection.query(query,
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

const getAllCoursesService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM courses');
    return result;
}

const getByIdCourseService = async (coursesId) => {
    const [result] = await dbConnection.query('SELECT * FROM courses WHERE Id=?', coursesId);
    return result;
}

const updateCoursesService = async (coursesId, courseData) => {
    const courses = {
        courseName: courseData.courseName,
        description: courseData.description,
        courseFees: courseData.courseFees,
        courseDuration: courseData.courseDuration,
        courseTypeId: courseData.courseTypeId
    }

    const [result] = await dbConnection.query('UPDATE courses SET ? WHERE Id=?',
        [courses, coursesId]
    );

    return result;
}

const deleteCoursesService = async (coursesId) => {
    const [result] = await dbConnection.query('DELETE FROM courses WHERE Id=?', [coursesId]);
    return result;
}

const addCourseService = async (courseTypePayload, coursePayload) => {
    const connection = await dbConnection.getConnection();

    try {
        await connection.beginTransaction();

        const [courseTypeResult] = await connection.query(
            `INSERT INTO courseTypes (typeName, description) VALUES (?, ?)`,
            [courseTypePayload.typeName, courseTypePayload.description]
        );
        const courseTypeId = courseTypeResult.insertId;

        await connection.query(
            `INSERT INTO courses (courseName, description, courseFees, courseDuration, courseTypeId,courseMode) VALUES (?, ?, ?, ?, ?,?)`,
            [
                coursePayload.courseName,
                coursePayload.description,
                coursePayload.courseFees,
                coursePayload.courseDuration,
                courseTypeId,
                coursePayload.courseMode
            ]
        );

        await connection.commit();
        return { courseTypeId };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const getCoursesWithTypeService = async (page = 1, limit = 10) => {
    const connection = await dbConnection.getConnection();
    try {
        const offset = (page - 1) * limit;
        const [rows] = await connection.query(
            `SELECT c.id AS courseId, c.courseName, c.description, c.courseFees, 
                    c.courseDuration, c.courseMode, 
                    ct.id AS courseTypeId, ct.typeName, ct.description AS typeDescription
             FROM courses c
             JOIN courseTypes ct ON c.courseTypeId = ct.id
             LIMIT ? OFFSET ?`, 
            [limit, offset]
        );

        const [countRows] = await connection.query(`SELECT COUNT(*) AS total FROM courses`);
        const total = countRows[0].total;

        return { course: rows, total, page, limit };
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const getCoursesWithTypeByIdService=async(id)=>{
     const connection = await dbConnection.getConnection();
    try {
        const [rows] = await connection.query(
            `SELECT c.id AS courseId, c.courseName, c.description, c.courseFees, 
                    c.courseDuration, ct.id AS courseTypeId, ct.typeName, ct.description AS typeDescription
             FROM courses c
             JOIN courseTypes ct ON c.courseTypeId = ct.id`
        );
        return rows;
    } finally {
        connection.release();
    }
}

const updateCourseWithTypeService=async(id,data)=>{
    const connection=await dbConnection.getConnection();
    try{
        const [result]=await connection.query(
            `UPDATE courses SET courseName=?,description=?,courseFees=?,courseDuration=? WHERE id=?`,
            [data.courseName, data.description,data.courseFees,data.courseDuration,id]
        );
        return result;
    }finally{
        connection.release();
    }
}

const deleteCourseWithTypeService=async(id)=>{
    const connection=await dbConnection.getConnection();
    try{
        const [result]=await connection.query('DELETE FROM courses WHERE id=?',[id]);
        return result;
    }finally {
        connection.release();
    }
}

module.exports = {
    postCoursesService,
    getAllCoursesService,
    getByIdCourseService,
    updateCoursesService,
    deleteCoursesService,
    addCourseService,
    getCoursesWithTypeService,
    getCoursesWithTypeByIdService,
    updateCourseWithTypeService,
    deleteCourseWithTypeService
}
