const supertest     = require('supertest');
const PATH          = 'http://localhost:4000/grades';
const ALL           =  '/all';
const SPECIFIC_DATA = '/test';
const REQUEST       = supertest(PATH);

function randomId() { return Math.floor(Math.random() * 20); }

function getAll(id)
{
    describe('Get test data of this user.', function(done)
    {
        it('Should return 200.', function(done)
        {
            REQUEST
                .get(ALL)
                .send({ id })
                .expect((res) => { console.log(res.body); } )
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function postData(data)
{
    describe('Post test data.', () => 
    {
        it('Should return 201.', function(done)
        {
            REQUEST
            .post(SPECIFIC_DATA)
            .send(data)
            .expect(201, 'Test data added.')
            .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function start()
{
    const id = randomId();
    console.log({id});
    let data = { id: id, subject_name: 'ASD', date: '2020-10-6', max_marks: 100, scored_marks: 99};
    postData(data);
    getAll(id);
}

module.exports = { start: start }