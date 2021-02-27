const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const assert = require('chai').assert;
const users = require('../routes/Users');
const server = require('../server');

describe('User signup', function () {
    before(function () {
        server.start();
    });

    after(function () {
        server.close();
    });

it('Should create a new user', async function () {
    await chai.request('http://localhost:80')
        .post('/signup')
        .send({
            name: 'testname',
            lastname: 'testlastname',
            email: 'test@email.com',
            phonenumber: 040123456,
            password: 'testpassword',
        })
        .then(res => {
            expect(res.status).to.equal(200);
        })
        .catch(err => {
            throw err
        })
})

it('Give 404 error when req body info missing when creating new user from the route', async function () {
    await chai.request('http://localhost:80')
        .post('/signup')
        .send({
            name: '',
            lastname: 'testlastname',
            email: '',
            phonenumber: 040123456,
            password: 'testpassword',
        })
        .then(res => {
            expect(res.status).to.equal(404);
        })
        .catch(err => {
            throw err
        })
    })
})