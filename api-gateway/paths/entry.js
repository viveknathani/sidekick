'use strict';

const authPaths = require('./Auth');
const expensesPaths = require('./Expenses');
const attendancePaths = require('./Attendance');
const gradesPaths = require('./Grades');

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