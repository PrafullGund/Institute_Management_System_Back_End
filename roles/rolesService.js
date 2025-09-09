const dbConnection=require('../config/connection');

const postRoleService=async(rolesData)=>{
    const query='INSERT INTO roles (name,description) VALUES (?,?)';
    const [result]=await dbConnection.query(query,[
        rolesData.name,
        rolesData.description
    ]);
    return result;
} 

const getAllRoleService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM roles');
    return result;
}

const getRolesByIdService=async (rolesId)=>{
    const [result]=await dbConnection.query('SELECT * FROM roles WHERE id=?',[rolesId]);
    return result;
}

const updateRolesService=async(rolesId,rolesData)=>{
    const roles={
       name:rolesData.name,
       description:rolesData.description
    }

    const [result]=await dbConnection.query('UPDATE roles SET ? WHERE id=?',[roles,rolesId]);
    return result;
}

const deleteRolesService=async (rolesId)=>{
    const [result]=await dbConnection.query('DELETE FROM roles WHERE id=?',[rolesId]);
    return result;
}

module.exports={
    postRoleService,
    getAllRoleService,
    getRolesByIdService,
    updateRolesService,
    deleteRolesService
}