const supertest     = require('supertest');
const PATH          = 'http://localhost:4000/expenses';
const SUMMARY       =  '/summary';
const TRANSACTION   = '/transaction';
const TRANSACTIONS  = '/transactions';
const REQUEST       = supertest(PATH);

function randomId() { return Math.floor(Math.random() * 20); }

function getAllTrans(id)
{
    describe('Get all transactions of the user.', function(done) 
    {
        it('Should return 200.', function(done)
        {
            REQUEST
                .get(TRANSACTIONS)
                .send({ id })
                .expect((res) => { console.log(res.body); } )
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function getSummary(id)
{
    describe('Get user data.', () => 
    {
        it('Should return 200.', function(done)
        {
            REQUEST
                .get(SUMMARY)
                .send({ id })
                .expect((res) => { console.log(res.body); })
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function postTrans(data)
{
    describe('Post transaction data.', () => 
    {
        it('Should return 200.', function(done)
        {
            REQUEST
            .post(TRANSACTION)
            .send(data)
            .expect(201, 'Transaction added')
            .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function postSummary(data)
{
    describe('Post user data.', () => 
    {
        it('Should return 201.', function(done)
        {
            REQUEST
                .post(SUMMARY)
                .send(data)
                .expect(201, 'Summary added/updated')
                .end((err, res) => { if(err){ throw err;} else { done(); } });
        });
    });
}

function start()
{
    const id = randomId()
    console.log( {id} );
    let summary = { id: id, cash: 5000, bank: 2000, ewallet: 500, total: 7500 }
    postSummary(summary);
    getSummary(id);
    const data = {id: id, description: 'netflix' , type: 0, mode: 1, value: 200 };
    postTrans(data);
    summary = {id: id, cash: 5000, bank: 2000, ewallet: 300, total: 7300 }
    postSummary(summary);
    getSummary(id);
    getAllTrans(id);
}

module.exports = { start : start }