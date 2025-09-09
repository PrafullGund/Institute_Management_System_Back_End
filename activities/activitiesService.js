const dbConnection=require('../config/connection');

const postActivitiesService=async (activityTypeData)=>{

    const query='INSERT INTO activities (activityTypeId, activityStatusId, dueDate, salesRepresentativeId, summary) VALUES (?,?,?,?,?)';
    const [result]=await dbConnection.query(query,
        [
            activityTypeData.activityTypeId,
            activityTypeData.activityStatusId,
            activityTypeData.dueDate,
            activityTypeData.salesRepresentativeId,
            activityTypeData.summary
        ]
    )
    return result;
}

const getAllActivitiesService=async()=>{
    const [result]=await dbConnection.query('SELECT * FROM activities');
    return result;
}

const getByIdActivitiesService=async(activitiesId)=>{
    const [result]=await dbConnection.query('SELECT * FROM activities WHERE Id=?',
        activitiesId
    );
    return result;
}

const updateActivitiesService=async(activitiesId,activitiesData)=>{
    const activities={
        activityTypeId:activitiesData.activityTypeId,
        activityStatusId:activitiesData.activityStatusId,
        dueDate:activitiesData.dueDate,
        salesRepresentativeId:activitiesData.salesRepresentativeId,
        summary:activitiesData.summary
    }

    const [result]=await dbConnection.query(
        `UPDATE activities SET ? WHERE Id=?`,
        [activities,activitiesId]
    );
    return result;
}

const deleteActivitiesService=async(activitiesId)=>{
    const [result]=await dbConnection.query('DELETE FROM activities WHERE Id=?',activitiesId);
    return result;
}

module.exports={
    postActivitiesService,
    getAllActivitiesService,
    getByIdActivitiesService,
    updateActivitiesService,
    deleteActivitiesService
}
