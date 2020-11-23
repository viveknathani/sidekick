'use strict';

const connectDB = require('../db/handle');
const bcrypt    = require('bcrypt');
const validator = require('./valid');
const jwt       = require('jsonwebtoken');
const AGE       = 3 * 24 * 60 * 60;

connectDB.connect(function(err)
{
    if(err) throw err;
    console.log('Connected to database.');
});

// Create a JWT.
function createToken(id)
{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: AGE});
}

// Query the database to find if the user exists.
function checkExistence(email)
{
    return new Promise(function(resolve, reject)
    {
        let exists = false;
        let sqlQuery = `SELECT user_email FROM users WHERE user_email = \'${email}\';`;
        connectDB.query(sqlQuery, function(err, result)
        {
            if(err) throw err;
            exists = !(result.length === 0 || result.length === undefined);
        });
        setTimeout(() => resolve(exists), 100);
    });
}

function wait(time)
{
    return new Promise(r => setTimeout(r, time));
}

module.exports = function(app)
{
    /* 
        Get the credentials.
        Validate format.
        Check for redundancy.
        Hash the password.
        Store in db.
    */
    app.post('/api/v1/signup', async (req, res) => 
    {
        console.log('Auth service : /api/v1/signup');
        const { email, password } = req.body;
        console.log(req.body);

        const validResult = validator.validateUser(email, password);
        if(!(validResult.emailRes === 'OK' && validResult.passwordRes === 'OK'))
        {
            console.log(validResult);
            res.status(400).send(validResult);
            return;
        }

        let userExists = await checkExistence(email);
        if(userExists)
        {
            res.status(302).send({message: "User exists."});
            return;
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        let sqlQuery = `INSERT INTO users (user_email, user_password) VALUES (\"${email}\", \"${hashedPassword}\");`;
        connectDB.query(sqlQuery, function(err, result)
        {
            if(err) throw err;
        })
        res.status(201).send({message: "Added user."});
    });

    /* 
        Get the credentials.
        Check user's existence.
        Get user_password and user_id from db.
        Validate password.
        Give JWT.
    */
    app.post('/api/v1/login', async (req, res) => 
    {
        console.log('Auth service : /api/v1/login');
        const { email, password } = req.body;
        let userExists = await checkExistence(email);

        if(!userExists)
        {
            res.status(404).send({message: 'User does not exist.'});
            return;
        }

        let sqlQuery = `SELECT * FROM users WHERE user_email = \'${email}\'`;
        let userPassword = '', userID;
        connectDB.query(sqlQuery, function(err, result)
        {
            if(err) throw err;
            userPassword = result[0].user_password;
            userID = result[0].user_id;
        });
        await wait(100); 
        const isGood = await bcrypt.compare(password, userPassword);

        if(isGood)
        {
            const token = createToken(userID);
            console.log({token});
            res.status(200).send({token});
        }

        else 
        {
            res.status(400).send({message: 'Incorrect password'});
        }
    });

    app.post('/api/v1/verifyToken', async (req, res) => 
    {
        const { token } = req.body;
        try 
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).send({decoded});
        }
        catch(err)
        {
            res.status(400).send({err});
        }
    });

    app.get('/api/v1/logout', (req, res) => 
    {
        res.status(200).send({token: ''});
    });
};