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
    app.get('/api/v1/transactions/:id', async (req, res) => 
    {
        const id = req.params.id;
        let sqlQuery = `SELECT * FROM transactions WHERE user_id=${id};`
        let data;        

        connectDB.query(sqlQuery, (err, result) => 
        {
            if(err) throw err;
            data = result;
        });

        await wait(100);

        res.status(200).send(data);
    });

    app.get('/api/v1/summary/:id', async (req, res) => 
    {
        const id = req.params.id;
        let sqlQuery = `SELECT * FROM summary WHERE user_id=${id};`;
        let data;        

        connectDB.query(sqlQuery, (err, result) => 
        {
            if(err) throw err;
            data = result;
        });

        await wait(100);

        res.status(200).send(data);
    });

    app.post('/api/v1/transaction', async (req, res) => 
    {
        const { id, description, type, mode, value } = req.body;
        let sqlQuery = `INSERT INTO transactions (user_id, description, transaction_type, transaction_mode, transaction_value) VALUES (${id}, \"${description}\", ${type}, ${mode}, ${value});`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Transaction added');
    });

    app.post('/api/v1/summary', async (req, res) => 
    {
        const { id, cash, bank, ewallet, total} = req.body;
        let sqlQuery = `INSERT INTO summary VALUES(${id}, ${cash}, ${bank}, ${ewallet}, ${total}) ON DUPLICATE KEY UPDATE cash=${cash}, bank=${bank}, ewallet=${ewallet}, total=${total};`;
        
        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(201).send('Summary added/updated');
    });

    app.delete('/api/v1/transaction', async (req, res) => 
    {
        const { transaction_id } = req.body;
        let sqlQuery = `DELETE FROM transactions WHERE transaction_id=${transaction_id};`;

        connectDB.query(sqlQuery, (err, result) =>
        {
            if(err) throw err;
        });

        await wait(100);

        res.status(204).send('Summary added/updated');
    });
}

