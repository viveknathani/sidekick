const mongoose = require('mongoose');
const detailsSchema = require('./details').schema;

const subject = mongoose.Schema(
{
    name: String,
    details: [detailsSchema]
});

module.exports = mongoose.model('subject', subject);