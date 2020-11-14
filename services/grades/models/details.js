const mongoose = require('mongoose');

const details = mongoose.Schema(
{
    date : Date,
    description : String,
    maxMarks : Number,
    scoredMarks : Number  
});

module.exports = mongoose.model('details', details);
