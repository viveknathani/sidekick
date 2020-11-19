'use strict';

require('dotenv').config();

const express    = require('express');
const paths      = require('./paths/entry');
const app        = express();

paths(app);
app.listen(process.env.PORT, () => console.log('Gateway up and running.'));