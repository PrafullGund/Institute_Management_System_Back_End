const dbConnection = require('../config/connection');
const bcrypt = require('bcrypt');

const postUserCredentialsService = async (userCredentialsData) => {
    const hashPassword = await bcrypt.hash(userCredentialsData.password, 10);

    const query = `
        INSERT INTO userCredentials (userId, email, mobile, password)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await dbConnection.query(query, [
        userCredentialsData.userId,
        userCredentialsData.email,
        userCredentialsData.mobile,
        hashPassword
    ]);

    return result;
};

const getAllUserCredentialsService=async ()=>{
    const [result]=await dbConnection.query('SELECT * FROM userCredentials')
    return result;
}

const getUserCredentialsByIdService=async(userId)=>{
    const [result]=await dbConnection.query('SELECT * FROM userCredentials WHERE id=?',userId);
    return result;
}

const updateUserCredentialsService = async (userCredentialsId, userCredentialsData) => {
    const hashPassword = await bcrypt.hash(userCredentialsData.password, 10);

    const userCredentials = {
        userId: userCredentialsData.userId,
        email: userCredentialsData.email,
        mobile: userCredentialsData.mobile,
        password: hashPassword 
    };

    const [result] = await dbConnection.query(
        `UPDATE userCredentials SET ? WHERE id = ?`,
        [userCredentials, userCredentialsId] 
    );

    return result;
};

const deleteUserCredentialsService=async (userCredentialsId)=>{
    const [result]=await dbConnection.query('DELETE FROM userCredentials WHERE id=?', [userCredentialsId]);
    return result;
}


module.exports = {
    postUserCredentialsService,
    getAllUserCredentialsService,
    getUserCredentialsByIdService,
    updateUserCredentialsService,
    deleteUserCredentialsService
};
