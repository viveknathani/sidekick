'use strict';

const connectDB = require('../db/handle');

connectDB.connect(function(err)
{
    if(err) throw err;
    console.log('Connected to database.');
});

function wait(time)
{
    return new Promise(r => setTimeout(r, time));
}

module.exports = function(app)
{
    app.get('/api/v1/all', async (req, res) => 
    {
        const { id } = req.body;
        let sqlQuery = `SELECT * FROM attendance WHERE user_id=${id};`;
        let data;        

        connectDB.query(sqlQuery, (err, result) => 
        {
            if(err) throw err;
            data = result;
        });

        await wait(100);

        res.status(200).send(data);
    });

    app.post('/api/v1/data', async (req, res) => 
    {
        const { id, subject_name, date, status } = req.body;
        let sqlQuery = `INSERT INTO attendance (user_id, subject_name, date, status) VALUES (${id}, \"${subject_name}\", \"${date}\", ${status});`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Attendance data added.');
    });

    app.put('/api/v1/data', async (req, res) => 
    {
        const {attendance_id, subject_name, date, status } = req.body;
        let sqlQuery = `UPDATE attendance SET subject_name=\"${subject_name}\", date=\"${date}\", status=${status} WHERE attendance_id=${attendance_id};`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Attendance data updated.');
    });

    app.delete('/api/v1/data', async (req, res) => 
    {
        const { attendance_id } = req.body;
        let sqlQuery = `DELETE FROM attendance WHERE attendance_id=${attendance_id};`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);        

        res.status(202).send('Attendance data deleted.');
    });
}