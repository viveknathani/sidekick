'use strict';

const URI_AUTH       = `http://localhost:${process.env.AUTH_PORT}/api/v1`;
const URI_EXPENSES   = `http://localhost:${process.env.EXPENSES_PORT}/api/v1`;
const URI_ATTENDANCE = `http://localhost:${process.env.ATTENDANCE_PORT}/api/v1`;
const URI_GRADES     = `http://localhost:${process.env.GRADES_PORT}/api/v1`;

module.exports = function(app)
{
    app.get('/', (req, res) => 
    {
        res.send('Hello this is the API-GATEWAY for sidekick');
    });

    app.post('/auth/signup', (req, res) => {});
    app.post('/auth/login', (req, res) => {});
    app.post('/auth/verifyToken', (req, res) => {});

    app.get('/expenses/transactions', (req, res) => {});
    app.get('/expenses/summary', (req, res) => {});
    app.post('/expenses/transactions', (req, res) => {});
    app.post('/expenses/summary', (req, res) => {});
    app.delete('/expenses/transactions', (req, res) => {});

    app.get('/attendance/all', (req, res) => {});
    app.get('/attendance/data', (req, res) => {});
    app.post('/attendance/data', (req, res) => {});
    app.put('/attendance/data', (req, res) => {});
    app.delete('/attendance/data', (req, res) => {});

    app.get('/grades/all', (req, res) => {});
    app.get('/grades/test', (req, res) => {});
    app.post('/grades/test', (req, res) => {});
    app.put('/grades/test', (req, res) => {});
    app.delete('/grades/test', (req, res) => {});
}