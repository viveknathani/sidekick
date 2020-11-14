'use strict';

const databaseHandler = require('../models/database');
const subjectModel = require('../models/subject');
const detailsModel = require('../models/details');

module.exports = function(app)
{
    databaseHandler.establishConnection();

    app.get('/api/v1/subjects', (req, res) => 
    {
        try 
        {
            let collect;
            await subjectModel.find()
                    .then(docs => collect = docs)
                    .catch(err => console.log(err));

            res.status(200).send(collect);        
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.post('/api/v1/subject', (req, res) => 
    {
        try 
        {
            const { subjectName } = req.body;
            let newSubjectCreator = new subjectModel({name: subjectName});
            await newSubjectCreator.save();
            res.status(201).send('Added new subject.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.post('/api/v1/test', (req, res) => 
    {
        try 
        {
            const { name, date, description, maxMarks, scoredMarks } = req.body;
            const detailsObject = new detailsModel({date, description, maxMarks, scoredMarks});
            await subjectModel.updateOne({name: name}, {$push: {details: detailsObject}});
            res.status(201).send('Added new details.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.delete('/api/v1/subject', (req, res) => 
    {
        try
        {
            const { name } = req.body;
            await subjectModel.findOneAndRemove({name});
            res.status(200).send('Deleted.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.delete('/api/v1/test', (req, res) => 
    {
        try
        {
            const { name, date, description, maxMarks, scoredMarks } = req.body;
            const detailsObject = new detailsModel({date, description, maxMarks, scoredMarks});
            await subjectModel.updateOne({name: name}, {$pull: {details: detailsObject}});
            res.status(200).send('Deleted.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });  

    app.put('/api/v1/modify/subject', (req, res) => 
    {
        try
        {
            const { oldName, newName } = req.body;
            await subjectModel.updateOne({name: oldName}, {name: newName});
            res.status(201).send('Updated.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/api/v1/modify/test', (req, res) => 
    {
        try
        {
            const { name, date, description, maxMarks, scoredMarks } = req.body;
            await subjectModel.updateOne({name: name, date: date}, {'details.$.date': date, 'details.$.description': description, 'details.$.maxMarks': maxMarks, 'details.$.scoredMarks': scoredMarks});
            res.status(201).send('Updated.');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });
}; 