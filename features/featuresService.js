const dbConnection=require('../config/connection');

const postFeaturesService=(featuresData,callback)=>{
    const query='INSERT INTO features (name,description) VALUES (?,?)';
    dbConnection.query(query,
        [
            featuresData.name,
            featuresData.description
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const getAllFeaturesService=(callback)=>{
    const query='SELECT * FROM features';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

module.exports={
    postFeaturesService,
    getAllFeaturesService
}