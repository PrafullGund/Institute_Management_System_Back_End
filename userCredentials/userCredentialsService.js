const dbConnection=require('../config/connection');

const postUserCredentialsService=(userCredentialsData,callback)=>{
    const query='INSERT INTO userCredentials (userId,email,mobile,password) VALUES (?,?,?,?)';
    dbConnection.query(query,
        [
            userCredentialsData.userId,
            userCredentialsData.email,
            userCredentialsData.mobile,
            userCredentialsData.password
        ],
        (error,result)=>{
            callback(error,result)
        }
    )
}

const getAllUserCredentialsService=(callback)=>{
    const query ='SELECT *FROM userCredentials';
    dbConnection.query(query,(error,result)=>{
        callback(error,result)
    })
}

const getUserInfo=(email,password)=>{
    const query=`SELECT * FROM userCredentials uc JOIN users u ON uc.id=u.id WHERE uc.email=? LIMIT 1`;
    return new Promise((resolve,reject)=>{
        dbConnection.query(query,[email],(error,results)=>{
            if(error){
                console.log("Error while querying the database:", error);
                reject(error);
            }else{
                resolve(results[0]);
            }
        })
    })
}


module.exports={
    postUserCredentialsService,
    getAllUserCredentialsService,
    getUserInfo
}