const dbConnection=require('../config/connection');

const postUserRoleMapperService=(userRoleMapperData,callback)=>{
    const query='INSERT INTO userRoleMapper (userId,roleId) VALUES (?,?)';
    dbConnection.query(query,
        [
            userRoleMapperData.userId,
            userRoleMapperData.roleId
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const getAllUserRoleMapperService=(callback)=>{
    const query='SELECT * FROM userRoleMapper';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

module.exports={
    postUserRoleMapperService,
    getAllUserRoleMapperService
}