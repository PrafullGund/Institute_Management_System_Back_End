const dbConnection=require('../config/connection');

const postFeatureRoleMappingService=(featureRoleMappingData,callback)=>{
    const query='INSERT INTO FeatureRoleMapping (featureId,roleId) VALUES (?,?)';
    dbConnection.query(query,
        [
            featureRoleMappingData.featureId,
            featureRoleMappingData.roleId
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const getAllFeatureRoleMappingService=(callback)=>{
    const query='SELECT * FROM FeatureRoleMapping';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

module.exports={
    postFeatureRoleMappingService,
    getAllFeatureRoleMappingService
}