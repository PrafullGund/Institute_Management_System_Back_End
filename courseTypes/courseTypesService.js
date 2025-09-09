const dbConnection = require('../config/connection');

const postCourseTypeService = async (courseTypeData) => {
    const query = 'INSERT INTO courseTypes (typeName,description) VALUES (?,?)';
    const [result] = await dbConnection.query(query,
        [
            courseTypeData.typeName,
            courseTypeData.description
        ]
    )
    return result;
}

const getAllCoursesService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM courseTypes');
    return result;
}

const getByIdCourseTypeService = async (courseTypeId) => {
    const [result] = await dbConnection.query('SELECT * FROM courseTypes WHERE Id=?', courseTypeId);
    return result;
}

const updateCoursesTypeService = async (courseTypeId, courseTypeData) => {
    const courseTypes = {
        typeName: courseTypeData.typeName,
        description: courseTypeData.description
    }

    const [result] = await dbConnection.query(`UPDATE courseTypes SET ? WHERE Id=?`,
        [courseTypes, courseTypeId]
    );
    return result;
}

const deleteCourseTypeService = async (courseTypeId) => {
    const [result] = await dbConnection.query('DELETE FROM courseTypes WHERE Id=?', [courseTypeId]);
    return result;
}

module.exports = {
    postCourseTypeService,
    getAllCoursesService,
    getByIdCourseTypeService,
    updateCoursesTypeService,
    deleteCourseTypeService
}