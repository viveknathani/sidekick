'use strict';

const fetch          =  require('node-fetch');
const URI_GRADES     = `http://localhost:${process.env.ATTENDANCE_PORT}/api/v1`;

module.exports = function(app)
{
    app.get('/attendance', (req, res) => 
    {
        res.send('Attendance handler.');
    });

    app.get('/attendance/all', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.get('/attendance/data', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.post('/attendance/data', (req, res) => 
    {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.put('/attendance/data', (req, res) => {
        try 
        {

        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    });

    app.delete('/attendance/data', (req, res) => 
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