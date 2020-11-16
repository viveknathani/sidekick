const auth = require('./src/auth');
const expenses = require('./src/expenses');
const service = process.argv[3];

if(service === 'auth')
{
    auth.start();
}

if(service === 'expenses')
{
    expenses.start();
}