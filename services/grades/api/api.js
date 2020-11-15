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
        let sqlQuery = `SELECT * FROM grades WHERE user_id=${id};`;
        let data;        

        connectDB.query(sqlQuery, (err, result) => 
        {
            if(err) throw err;
            data = result;
        });

        await wait(100);

        res.status(200).send(data);
    });

    app.post('/api/v1/test', async (req, res) => 
    {
        const { id, subject_name, date, max_marks, scored_marks } = req.body;
        let sqlQuery = `INSERT INTO grades VALUES (${id}, \"${subject_name}\", \"${date}\", ${max_marks}, ${scored_marks});`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Test data added.');
    });

    app.put('/api/v1/test', async (req, res) => 
    {
        const {grades_id, subject_name, date, max_marks, scored_marks } = req.body;
        let sqlQuery = `UPDATE grades SET subject_name=\"${subject_name}\", date=\"${date}\", max_marks=${max_marks}, scored_marks=${scored_marks} WHERE grades_id=${grades_id};`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Test data updated.');
    });

    app.delete('/api/v1/test', async (req, res) => 
    {
        const { grades_id } = req.body;
        let sqlQuery = `DELETE FROM grades WHERE grades_id=${gradfes_id};`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);        

        res.status(202).send('Test data deleted.');
    });
}