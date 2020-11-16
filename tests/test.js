const auth = require('./src/auth');
const expenses = require('./src/expenses');
const attendance = require('./src/attendance');
const grades = require('./src/grades');
const service = process.argv[3];

if(service === 'src/auth')
{
    auth.start();
}

if(service === 'src/expenses')
{
    expenses.start();
}

if(service === 'src/attendance')
{
    attendance.start();
}

if(service === 'src/grades')
{
    grades.start();
}