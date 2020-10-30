'use strict';

const databaseHandler = require('../models/database');

function wait(time)
{
    return new Promise(r => setTimeout(r, time));
}

module.exports = function(app)
{
    databaseHandler.establishConnection();
    
    app.get('/api/v1/subjects', (req, res) => {});
    app.post('/api/v1/subject', (req, res) => {});
    app.post('/api/v1/data', (req, res) => {});
    app.delete('/api/v1/subject', (req, res) => {});
    app.delete('/api/v1/data', (req, res) => {});  
    app.post('/api/v1/modify/subject', (req, res) => {});
    app.post('/api/v1/modify/data', (req, res) => {});
};