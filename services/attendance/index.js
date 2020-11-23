'use strict';

require('dotenv').config();

const PORT    = process.env.PORT;
const express = require('express');
const app     = express();
const paths   = require('./api/api');
app.use(express.json());

paths(app);
app.listen(PORT, () => console.log(`Attendance server running at http://localhost:${PORT}`));