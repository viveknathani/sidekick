'use strict';

const connectDB = require('../db/handle');
const bcrypt = require('bcrypt');
const validator = require('./valid');
const jwt = require('jsonwebtoken');
const AGE = 3 * 24 * 60 * 60;

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
        const { email, password } = req.body;

        const validResult = validator.validateUser(email, password);
        if(!(validResult.emailRes === 'OK' && validResult.passwordRes === 'OK'))
        {
            res.status(400).send(validResult);
            return;
        }

        let userExists = await checkExistence(email);
        if(userExists)
        {
            res.status(302).send("User exists.");
            return;
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        let sqlQuery = `INSERT INTO users (user_email, user_password) VALUES (\"${email}\", \"${hashedPassword}\");`;
        connectDB.query(sqlQuery, function(err, result)
        {
            if(err) throw err;
        })
        res.status(201).send("Added user.");
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
        const { email, password } = req.body;
        let userExists = await checkExistence(email);

        if(!userExists)
        {
            res.status(404).send('User does not exist.');
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
            res.cookie('jwt', token, { httpOnly: true, maxAge: AGE * 1000});
            res.status(200).send('Logged in');
        }

        else 
        {
            res.status(400).send('Incorrect password');
        }
    });

    /* 
        Just replace the cookie.
    */
    app.get('/api/v1/logout', (req, res) => 
    {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1});
    });
};
