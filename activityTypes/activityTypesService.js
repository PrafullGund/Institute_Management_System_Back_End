const dbConnection = require('../config/connection');

const postActivityTypesService = async (activityTypesData) => {
    const query = 'INSERT INTO activityTypes (typeName) VALUES (?)';
    const [result] = await dbConnection.query(query, [activityTypesData.typeName]);
    return result;
};

const getAllActivityTypesService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM activityTypes');
    return result;
}

const getAllActivityTypesByIdService = async (activityTypesId) => {
    const [result] = await dbConnection.query('SELECT * FROM activityTypes WHERE id=?', [
        activityTypesId
    ]);
    return result;
}

const updateActivityTypesService = async (activityTypesId, activityTypesData) => {
    const activityTypes = {
        typeName: activityTypesData.typeName
    }
    const [result] = await dbConnection.query(`UPDATE activityTypes SET ? WHERE id=?`,
        [activityTypes, activityTypesId]
    )
    return result;
}

const deleteActivityTypesService = async (activityTypesId) => {
    const [result] = await dbConnection.query('DELETE FROM activityTypes WHERE id=?',
        [activityTypesId]
    );
    return result;
}

module.exports = {
    postActivityTypesService,
    getAllActivityTypesService,
    getAllActivityTypesByIdService,
    updateActivityTypesService,
    deleteActivityTypesService
};
