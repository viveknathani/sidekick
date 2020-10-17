'use strict';

const connectDB = require('../db/handle');

module.exports = function(app)
{
    app.get('/api/v1/signup', (req, res) => {});
    app.post('/api/v1/login', (req, res) => {});
    app.get('/api/logout', (req, res) => {});
};
