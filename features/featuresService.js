const dbConnection = require('../config/connection');

const postFeaturesService = async (featuresData) => {
    const query = 'INSERT INTO features (name,description) VALUES (?,?)';

    const [result] = await dbConnection.query(query, [
        featuresData.name,
        featuresData.description
    ]);
    return result;
}

const getAllFeaturesService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM features');
    return result;
}

const getFeaturesByIdService = async (featuresId) => {
    const [result] = await dbConnection.query('SELECT * FROM features WHERE id=?',
        [featuresId]
    );
    return result;
}

const updateFeaturesService = async (featuresId, featuresData) => {
    const features = {
        name: featuresData.name,
        description: featuresData.description
    }
    const [result] = await dbConnection.query(`UPDATE features SET ? WHERE id=?`,
        [features, featuresId]
    );
    return result;
}

const deleteFeaturesService = async (featuresId) => {
    const [result] = await dbConnection.query('DELETE FROM features WHERE id=?',
        [featuresId]
    );
    return result;
}

module.exports = {
    postFeaturesService,
    getAllFeaturesService,
    getFeaturesByIdService,
    updateFeaturesService,
    deleteFeaturesService
}
