'use strict';

const databaseHandler = require('../models/database');

module.exports = function(app)
{
    databaseHandler.establishConnection();

    app.get('/api/v1/subjects', (req, res) => {});
    app.post('/api/v1/subject', (req, res) => {});
    app.post('/api/v1/test', (req, res) => {});
    app.delete('/api/v1/subject', (req, res) => {});
    app.delete('/api/v1/test', (req, res) => {});  
    app.put('/api/v1/modify/subject', (req, res) => {});
    app.put('/api/v1/modify/test', (req, res) => {});
}; 