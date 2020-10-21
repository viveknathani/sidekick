'use strict';

const connectDB = require('../db/handle');
const CREDIT    = 0;
const DEBIT     = 1;
const CASH      = 0;
const BANK      = 1;
const EWALLET   = 2;

connectDB.connect(function(err)
{
    if(err) throw err;
    console.log('Connected to database.');
});

module.exports = function(app)
{
    app.get('/api/v1/transactions', (req, res) => {});
    app.get('/api/v1/summary', (req, res) => {});
    app.post('/api/v1/transaction', (req, res) => {});
    app.post('/api/v1/summary', (req, res) => {});
    app.delete('/api/v1/transaction', (req, res) => {});
}

