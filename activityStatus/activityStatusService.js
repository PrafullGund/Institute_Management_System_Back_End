const dbConnection=require('../config/connection');

const postActivityStatusService=async(activityStatusData)=>{
    const query='INSERT INTO activityStatus (statusName) VALUES (?)';
    const [result]=await dbConnection.query(query,[
        activityStatusData.statusName
    ]);
    return result;
}

const getAllActivityStatusService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM activityStatus');
    return result;
}

const getActivityStatusByIdService=async(activityStatusId)=>{
    const [result]=await dbConnection.query('SELECT * FROM activityStatus WHERE id=?',
        [activityStatusId]
    );
    return result;
}

const updateActivityStatusService=async (activityStatusId,activityStatusData)=>{
    const activityStatus={
        statusName:activityStatusData.statusName
    }

    const [result]=await dbConnection.query(
        `UPDATE activityStatus SET ? WHERE id=?`,
        [ activityStatus,activityStatusId ]
    );
    return result;
}

const deleteActivityStatusService=async(activityStatusId)=>{
    const [result]=await dbConnection.query('DELETE FROM activityStatus WHERE id=?',
        [activityStatusId]
    )
    return result;
}

module.exports={
    postActivityStatusService,
    getAllActivityStatusService,
    getActivityStatusByIdService,
    updateActivityStatusService,
    deleteActivityStatusService
}