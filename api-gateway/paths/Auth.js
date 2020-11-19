'use strict';

const fetch          =  require('node-fetch');
const URI_AUTH       = `http://localhost:${process.env.AUTH_PORT}/api/v1`;
const commonHeaders  =  { 'Content-Type': 'application/json' }
const commonOptions  = (req) => {
    return {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(req.body)
    }
}

module.exports = function(app)
{
    app.get('/auth', (req, res) => 
    {
        res.send('Auth handler.');
    });

    app.post('/auth/signup', (req, res) => 
    {
        console.log('Gateway POST/signup');
        try 
        {
            let statusNumber;
            console.log(req.body);
            fetch(`${URI_AUTH}/signup`, commonOptions(req))
                    .then((response) => {
                            statusNumber = response.status;
                            return response.json();
                        })
                    .then((result) => res.status(statusNumber).send(result));
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send({message: err});
        }
    });

    app.post('/auth/login', (req, res) => 
    {
        console.log('Gateway POST/login');
        try 
        {
            let statusNumber;
            console.log(req.body);
            fetch(`${URI_AUTH}/login`, commonOptions(req))
                    .then((response) => {
                            statusNumber = response.status;
                            return response.json();
                        })
                    .then((result) => {
                        console.log(result);
                        res.status(statusNumber).send(result)});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/auth/verifyToken', (req, res) => 
    {
        console.log('Gateway POST/verifyToken');
        try 
        {
            let statusNumber;
            console.log(req.body);
            fetch(`${URI_AUTH}/verifyToken`, commonOptions(req))
                    .then((response) => {
                            statusNumber = response.status;
                            return response.json();
                        })
                    .then((result) => res.status(statusNumber).send(result));
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });
}
