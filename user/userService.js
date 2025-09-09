const dbConnection = require('../config/connection');

const postUserService = async (userData) => {
    const query = `INSERT INTO user (firstName, lastName, dob, userTypeId) VALUES (?, ?, ?, ?)`;

    const dob = new Date(userData.dob); 

    const [result] = await dbConnection.query(query, [
        userData.firstName,
        userData.lastName,
        dob, 
        userData.userTypeId
    ]);

    return result;
};

const getAllUserService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM user');
    return result;
}

const getUserByIdService=async(userId)=>{
    const [result]=await dbConnection.query('SELECT * FROM user WHERE id=?',[userId]);
    return result;
}

const updateUserService=async (userId,userData)=>{
    const dob = new Date(userData.dob); 

    const user={
        firstName:userData.firstName,
        lastName:userData.lastName,
        dob,
        userTypeId:userData.userTypeId
    };

    const [result]=await dbConnection.query(
        'UPDATE user SET ? WHERE id=?',
        [user,userId]
    )
    return result;
}

const deleteUserService=async (userId)=>{
    const [result]=await dbConnection.query('DELETE FROM user WHERE id=?',[userId]);
    return result;
}

const getUserByEmail = async (email) => {
    const query = `
        SELECT 
            u.id as userId,
            u.firstName,
            u.lastName,
            u.dob,
            u.userTypeId,
            uc.password,
            uc.email,
            r.name AS role
        FROM user u
        JOIN usercredentials uc ON u.id = uc.userId
        LEFT JOIN userRoleMapper urm ON u.id = urm.userId
        LEFT JOIN roles r ON urm.roleId = r.id
        WHERE uc.email = ?
        LIMIT 1;
    `;
  const [rows] = await dbConnection.query(query, [email]);
    return rows[0]; 
};

async function getUserFeatures(userId){
    const query=`SELECT DISTINCT f.name FROM featureRoleMapping fr JOIN features f ON fr.featureId=f.id JOIN userRoleMapper urm ON fr.roleId=urm.roleId WHERE urm.userId=?`;
     const [uniqueFeatureKeys] = await dbConnection.query(query, [userId]);
    return uniqueFeatureKeys.map((row) => row.name);
}

module.exports = {
    postUserService,
    getAllUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getUserByEmail,
    getUserFeatures
};
