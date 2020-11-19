'use strict';

const fetch          =  require('node-fetch');
const URI_GRADES     = `http://localhost:${process.env.GRADES_PORT}/api/v1`;

module.exports = function(app)
{
    app.get('/grades', (req, res) => 
    {
        res.send('Grades handler.');
    });

    app.get('/grades/all', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.get('/grades/test', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/grades/test', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.put('/grades/test', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.delete('/grades/test', (req, res) => 
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