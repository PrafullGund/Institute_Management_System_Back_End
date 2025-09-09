const dbConnection=require('../config/connection');
const userCredentialService=require('../userCredentials/userCredentialsService')

const postUserService=(usersData,callback)=>{
    const query='INSERT INTO users (firstName,lastName,dob,userTypeId) VALUES (?,?,?,?)';
    dbConnection.query(query,
        [
            usersData.firstName,
            usersData.lastName,
            usersData.dob,
            usersData.userTypeId
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
};

const getAllUsersService=(callback)=>{
    const query='SELECT * FROM users';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

const getByIdUsersService=(usersId,callback)=>{
    const query='SELECT * FROM users WHERE id=?';
    dbConnection.query(query,[usersId],(error,result)=>{
        callback(error,result)
    })
}

const updateUsersService=(usersId,usersData,callback)=>{
    const query=`UPDATE users SET firstName=?,lastName=?,dob=?,userTypeId=? WHERE id=?`;
    dbConnection.query(query,
        [
            usersData.firstName,
            usersData.lastName,
            usersData.dob,
            usersData.userTypeId,
            usersId
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const deleteUsersService=(usersId,callback)=>{
    const query='DELETE FROM users WHERE id=?';
    dbConnection.query(query,[usersId],(error,result)=>{
        callback(error,result)
    })
}

// const getUserByEmail=(email,password)=>{
//     const userInfo=userCredentialService.getUserInfo(email,password);
//     return userInfo;
// }
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
        FROM users u
        JOIN usercredentials uc ON u.id = uc.userId
        LEFT JOIN userRoleMapper urm ON u.id = urm.userId
        LEFT JOIN roles r ON urm.roleId = r.id
        WHERE uc.email = ?
        LIMIT 1;
    `;
    const [rows] = await dbConnection.promise().query(query, [email]);
    return rows[0]; 
};

async function getUserFeatures(userId){
    const query=`SELECT DISTINCT f.name FROM FeatureRoleMapping fr JOIN features f ON fr.featureId=f.id JOIN userRoleMapper urm ON fr.roleId=urm.roleId WHERE urm.userId=?`;
    const [uniqueFeatureKeys]=await dbConnection.promise().query(query,[userId]);
    return uniqueFeatureKeys.map((row)=>row.name);
}



module.exports={
    postUserService,
    getAllUsersService,
    getByIdUsersService,
    updateUsersService,
    deleteUsersService,
    getUserByEmail,
    getUserFeatures
}