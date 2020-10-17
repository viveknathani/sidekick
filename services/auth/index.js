'use strict';

require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const app = express();
const paths = require('./api/api');

paths(app);
app.listen(PORT, () => console.log(`Auth server running at http://localhost:${PORT}`));