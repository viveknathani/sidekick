'use strict';

const fetch          =  require('node-fetch');
const URI_AUTH       = `http://localhost:${process.env.AUTH_PORT}/api/v1`;

module.exports = function(app)
{
    app.get('/auth', (req, res) => 
    {
        res.send('Auth handler.');
    });

    app.post('/auth/signup', (req, res) => 
    {
        try 
        {
            const { email, password } = req.body;
            const data = { email, password };
            fetch(`${URI_AUTH}/signup`, {
                method: 'POST',
                body: data 
            }).then((response) => response.json())
              .then((result) => res.status(200).send(result));
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/auth/login', (req, res) => 
    {
        try 
        {
            const { email, password } = req.body;
            const data = { email, password };
            fetch(`${URI_AUTH}/login`, {
                method: 'POST',
                body: data 
            }).then((response) => response.json())
              .then((result) => res.status(200).send(result));
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/auth/verifyToken', (req, res) => 
    {
        try 
        {
            
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });
}
