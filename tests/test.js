const auth = require('./auth');
const expenses = require('./expenses');
const service = process.argv[3];

if(service === 'auth')
{
    auth.start();
}

if(service === 'expenses')
{
    expenses.start();
}