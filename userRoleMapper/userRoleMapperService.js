const dbConnection = require('../config/connection');

const postUserRoleMapperService = async (userRoleData) => {
    const query = 'INSERT INTO userRoleMapper (userId,roleId) VALUES (?,?)';
    const [result] = await dbConnection.query(query, [
        userRoleData.userId,
        userRoleData.roleId
    ]);
    return result;
}

const getAllUserRoleMapperService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM userRoleMapper');
    return result;
}

const getUserRoleMapperByIdService = async (userRoleMapperId) => {
    const [result] = await dbConnection.query('SELECT * FROM userRoleMapper WHERE id=?', 
        [userRoleMapperId]
    );
    return result;
}

const updateUserRoleMapperService = async (userRoleMapperId, userRoleMapperData) => {
    const userRoleMapper = {
        userId: userRoleMapperData.userId,
        roleId: userRoleMapperData.roleId
    }
    const [result] = await dbConnection.query(`UPDATE userRoleMapper SET ? WHERE id=?`,
        [userRoleMapper, userRoleMapperId]
    );
    return result;
}

const deleteUserRoleMapperService = async (userRoleMapperId) => {
    const result = await dbConnection.query('DELETE FROM userRoleMapper WHERE id=?', 
        [userRoleMapperId]
    );
    return result;
}

module.exports = {
    postUserRoleMapperService,
    getAllUserRoleMapperService,
    getUserRoleMapperByIdService,
    updateUserRoleMapperService,
    deleteUserRoleMapperService
}
