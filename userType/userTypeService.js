const dbConnection = require('../config/connection');

const postUserTypeService = (userTypeData, callback) => {
    const query = 'INSERT INTO userType (userTypeName,userTypeDescription) VALUES (?,?)';

    dbConnection.query(query,
        [
            userTypeData.userTypeName,
            userTypeData.userTypeDescription
        ],
        (error, result) => {
            callback(error, result);
        }
    );
};

const getAllUserTypeService = async () => {
    const [rows] = await dbConnection.query('SELECT * FROM userType');
    return rows;
};

const getUserTypeIdService = async (userTypeId) => {
    const [rows] = await dbConnection.query('SELECT * FROM userType WHERE id = ?', [userTypeId]);
    return rows;
};

const updateUserTypeService = async (userTypeId, userTypeData) => {
    const userType = {
        userTypeName: userTypeData.userTypeName,
        userTypeDescription: userTypeData.userTypeDescription
    };

    const [result] = await dbConnection.query(
        'UPDATE userType SET ? WHERE id = ?',
        [userType, userTypeId]
    );

    return result;
};

const deleteUserTypeService=async(userTypeId)=>{
    const [result]= await dbConnection.query(
        'DELETE FROM userType WHERE id=?',
        [userTypeId]
    );
    return result;
}

module.exports = {
    postUserTypeService,
    getAllUserTypeService,
    getUserTypeIdService,
    updateUserTypeService,
    deleteUserTypeService
}