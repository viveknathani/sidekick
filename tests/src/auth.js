const supertest = require('supertest');
const PATH      = 'http://localhost:4000/auth';
const SIGNUP    = '/signup';
const LOGIN     = '/login';
const TOKEN     = '/verifyToken'; 
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
                .end((err, res) => {
                        if (err) { throw err; }
                        else {
                            console.log({ status: res.status, content: res.body });
                            done();
                        }
                    })              
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
                .end((err, res) => {
                    if (err) { throw err; }
                    else {
                        console.log({ status: res.status, content: res.body });
                        tokenVerification(res.body.token);
                        done();
                    }
                })   
        });
    });
}

function tokenVerification(token)
{
    describe('Send token.', () => 
    {
        it('Should return 200', function(done)
        {
            REQUEST
                .post(TOKEN)
                .send({token})
                .end((err, res) => {
                    if (err) { throw err; }
                    else {
                        console.log({ status: res.status, content: res.body });
                        done();
                    }
                })   
        })
    });
}

function start()
{
    const email    = randomString(8) + 'v2@gmail.com'
    const password = randomString(8) + 'v2'; 
    signup(email, password);
    login(email, password);
}

module.exports = { start: start }