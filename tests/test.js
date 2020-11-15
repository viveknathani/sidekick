const auth = require('./auth');
const service = process.argv[3];

if(service === 'auth')
{
    auth.start();
}