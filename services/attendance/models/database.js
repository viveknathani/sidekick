const mongoose = require('mongoose');
const mongoServerPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

function establishConnection()
{
    mongoose.connect(mongoServerPath,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to the database.'))
    .catch(err => console.log('Database connection error.'));
}

module.exports = { establishConnection: establishConnection };
