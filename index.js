const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();

app.use(cors());
app.use(bodyParser.json());

const userTypeRoute=require('./userType/userTypeRoute');
const userRoute=require('./user/userRoute');
const userCredentialsRoute=require('./userCredentials/userCredentialsRoute');
const userAddressRoute=require('./userAddress/userAddressRoute');
const userEducationDetailsRoute=require('./userEducationDetails/userEducationDetailsRoute');
const rolesRoute=require('./roles/rolesRoute');
const userRoleMapperRoute=require('./userRoleMapper/userRoleMapperRoute');
const featuresRoute=require('./features/featuresRoute');
const featureRoleMappingRoute=require('./featureRoleMapping/featureRoleMappingRoute');
const activityTypesRoute=require('./activityTypes/activityTypesRoute');
const activityStatusRoute=require('./activityStatus/activityStatusRoute');
const activitiesRoute=require('./activities/activitiesRoute');
const pipeLinePhasesRoute=require('./pipeLinePhases/pipeLinePhasesRoute');
const courseTypesRoute=require('./courseTypes/courseTypesRoute');
const coursesRoute=require('./courses/coursesRoute');
const enquiriesRoute=require('./enquiries/enquiriesRoute');
const communicationLogRoute=require('./communicationLog/communicationLogRoute');
const subjectsRoute=require('./subjects/subjectsRoute');
const courseSubjectMappingRoute=require('./courseSubjectMapping/courseSubjectMappingRoute');
const syllabusRoute=require('./syllabus/syllabusRoute');
const admissionsRoute=require('./admissions/admissionsRoute');
const feePaymentsRoute=require('./feePayments/feePaymentsRoute');

app.use('/',userTypeRoute);
app.use('/',userRoute);
app.use('/',userCredentialsRoute);
app.use('/',userAddressRoute);
app.use('/',userEducationDetailsRoute);
app.use('/',rolesRoute);
app.use('/',userRoleMapperRoute);
app.use('/',featuresRoute);
app.use('/',featureRoleMappingRoute);
app.use('/',activityTypesRoute);
app.use('/',activityStatusRoute);
app.use('/',activitiesRoute);
app.use('/',pipeLinePhasesRoute);
app.use('/',courseTypesRoute);
app.use('/',coursesRoute);
app.use('/',enquiriesRoute);
app.use('/',communicationLogRoute);
app.use('/',subjectsRoute);
app.use('/',courseSubjectMappingRoute);
app.use('/syllabus',syllabusRoute);
app.use('/admissions',admissionsRoute);
app.use('/feePayments',feePaymentsRoute);

const port=3000;

app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`);
})