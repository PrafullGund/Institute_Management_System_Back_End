const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const userTypeRoute = require('./userType/userTypeRoute');
const usersRoute=require('./users/usersRoute');
const userCredentialsRoute = require('./userCredentials/userCredentialsRoute'); 
const roleRoute=require('./roles/roleRoute');
const userRoleMapperRoute=require('./userRoleMapper/userRoleMapperRoute')
const featuresRoute=require('./features/featuresRoute');
const featureRoleMappingRoute=require('./featureRoleMapping/featureRoleMappingRoute');

app.use('/', userTypeRoute);
app.use('/',usersRoute);
app.use('/', userCredentialsRoute); 
app.use('/',roleRoute);
app.use('/',userRoleMapperRoute);
app.use('/',featuresRoute);
app.use('/',featureRoleMappingRoute)

const port = 4000;

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})
