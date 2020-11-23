'use strict';

/*
    Requests to be proxied are categorised by the 
    name of service. Each of the remaining modules 
    in this folder export a function that proxies 
    a request made by Express app.
*/ 

const authPaths       = require('./Auth');
const expensesPaths   = require('./Expenses');
const attendancePaths = require('./Attendance');
const gradesPaths     = require('./Grades');

module.exports = function(app)
{
    app.get('/', (req, res) => 
    {
        res.send('Hello this is the API-GATEWAY for sidekick.');
    });

    authPaths(app);
    expensesPaths(app);   
    attendancePaths(app);
    gradesPaths(app);
}