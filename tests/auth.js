const supertest = require('supertest');
const PATH      = 'http://localhost:8080/api/v1';
const SIGNUP    = '/signup';
const LOGIN     = '/login';
const REQUEST   = supertest(PATH);

function randomString(len)
{
    let result = '';
    const possibleValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for(let i = 0; i < len; i++)
    {
        let index = Math.floor(Math.random() * (possibleValues.length));
        result += possibleValues[index];
    }
    return result;
}

function signup(email, password)
{
    describe(`Signup user with email : ${email} and password : ${password}.`, () => 
    {
        it('Should return 201.', function(done)
        {
            REQUEST
                .post(SIGNUP)
                .send({email, password})
                .expect(201, 'Added user.')
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function login(email, password)
{
    describe(`Login user with email : ${email} and password : ${password}.`, () => 
    {
        it('Should return 200.', function(done)
        {
            REQUEST
                .post(LOGIN)
                .send({email, password})
                .expect(200, 'Logged in')
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function start()
{
    const email    = randomString(10) + '@gmail.com';
    const password = randomString(8)  + 'a1B'; 
    signup(email, password);
    login(email, password);
}

module.exports = { start: start }