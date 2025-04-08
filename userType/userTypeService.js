const dbConnection = require('../config/connection');

const postUserTypeService = (userTypeData, callback) => {
    const query = `INSERT INTO userType (userTypeName, userTypeDescription) VALUES (?, ?)`;

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

const getAllUserTypeService = (callback) => {
    const query = `SELECT * FROM userType`;
    dbConnection.query(query, (error, result) => {
        callback(error, result);
    })
}

const getUserTypeByIdService = (userTypeId, callback) => {
    const query = 'SELECT * FROM userType WHERE id=?';
    dbConnection.query(query, [userTypeId], (error, result) => {
        callback(error, result)
    })
}

const updateUserTypeService = (userTypeId, userTypeData, callback) => {
    const query = `UPDATE userType SET userTypeName=?, userTypeDescription=? WHERE id=?`;
    dbConnection.query(query,
        [
            userTypeData.userTypeName,
            userTypeData.userTypeDescription,
            userTypeId
        ],
        (error, result) => {
            callback(error, result)
        }
    )
}

const deleteUserTypeService = (userTypeId, callback) => {
    const query = 'DELETE FROM userType WHERE id=?';
    dbConnection.query(query, [userTypeId], (error, result) => {
        callback(error, result)
    }
    )
}

module.exports = {
    postUserTypeService,
    getAllUserTypeService,
    getUserTypeByIdService,
    updateUserTypeService,
    deleteUserTypeService
}