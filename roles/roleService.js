const dbConnection=require('../config/connection');

const postRoleService=(roleData,callback)=>{
    const query='INSERT INTO roles (name,description) VALUES (?,?)';
    dbConnection.query(query,
        [
            roleData.name,
            roleData.description
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const getAllRoleService=(callback)=>{
    const query='SELECT * FROM roles';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

module.exports={
    postRoleService,
    getAllRoleService
}