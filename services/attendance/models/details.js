const mongoose = require('mongoose');

const details = mongoose.Schema(
{
    date : Date,
    status : Number    
});

module.exports = mongoose.model('details', details);

