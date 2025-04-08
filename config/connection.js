const mysql=require('mysql2');
const config=require('./config.json');

const connection=mysql.createConnection(config.development);

connection.connect(function(err){
    if(err)throw err;
    console.log("Database Connected");
})

module.exports=connection;