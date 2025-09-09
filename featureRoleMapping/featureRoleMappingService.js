const dbConnection = require('../config/connection');

const postFeatureRoleMappingService = async (featureRoleMappingData) => {
    const query = 'INSERT INTO featureRoleMapping (featureId,roleId) VALUES (?,?)';
    const [result] = await dbConnection.query(query, [
        featureRoleMappingData.roleId,
        featureRoleMappingData.featureId
    ]);
    return [result];
}

const getAllFeatureRoleMappingService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM featureRoleMapping');
    return result;
}

const getFeatureRoleMappingByIdService=async(featureRoleMappingId)=>{
    const [result]=await dbConnection.query('SELECT * FROM featureRoleMapping WHERE id=?',
        [featureRoleMappingId]
    );
    return result;
}

const updateFeatureRoleMappingService=async(featureRoleMappingId,featureRoleMappingData)=>{
    const featureRoleMapping={
        roleId:featureRoleMappingData.roleId,
        featureId:featureRoleMappingData.featureId
    }
    const [result]=await dbConnection.query(
        'UPDATE featureRoleMapping SET ? WHERE id=?',
        [featureRoleMapping,featureRoleMappingId]
    )
    return result;
}

const deleteFeatureRoleMappingService=async (featureRoleMappingId)=>{
    const [result]=await dbConnection.query('DELETE FROM featureRoleMapping WHERE id=?',
        [featureRoleMappingId]
    );
    return result;
}

module.exports = {
    postFeatureRoleMappingService,
    getAllFeatureRoleMappingService,
    getFeatureRoleMappingByIdService,
    updateFeatureRoleMappingService,
    deleteFeatureRoleMappingService
}


