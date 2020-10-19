'use strict';

require('dotenv').config();

const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const paths = require('./api/api');
app.use(express.json());
app.use(cookieParser());

paths(app);
app.listen(PORT, () => console.log(`Auth server running at http://localhost:${PORT}`));