const supertest     = require('supertest');
const PATH          = 'http://localhost:8082/api/v1';
const ALL           =  '/all';
const SPECIFIC_DATA = '/data';
const REQUEST       = supertest(PATH);

function randomId() { return Math.floor(Math.random() * 20); }

function getAll(id)
{
    describe('Get attendance data of this user.', function(done)
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
    describe('Post attendance data.', () => 
    {
        it('Should return 201.', function(done)
        {
            REQUEST
            .post(SPECIFIC_DATA)
            .send(data)
            .expect(201, 'Attendance data added.')
            .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function start()
{
    const id = randomId();
    console.log({id});
    let data = { id: id, subject_name: 'ASD', date: '2018-10-5', status: 1};
    postData(data);
    getAll(id);
}

module.exports = { start: start }