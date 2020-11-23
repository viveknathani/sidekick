'use strict';

/*
    This is the entry point of the API-Gateway.
    All requests made by client are proxied through this
    application. 
*/

require('dotenv').config();

const express    = require('express');
const paths      = require('./paths/entry');
const app        = express();

paths(app);
app.use(express.json());
app.listen(process.env.PORT, () => console.log('Gateway up and running.'));