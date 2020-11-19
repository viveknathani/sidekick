'use strict';

const fetch          =  require('node-fetch');
const URI_EXPENSES   = `http://localhost:${process.env.EXPENSES_PORT}/api/v1`;

module.exports = function(app)
{
    app.get('/expenses', (req, res) => 
    {
        res.send('Expenses handler.');
    });

    app.get('/expenses/transactions', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.get('/expenses/summary', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/expenses/transactions', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/expenses/summary', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.delete('/expenses/transactions', (req, res) => 
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