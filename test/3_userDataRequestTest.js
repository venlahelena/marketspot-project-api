const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const assert = require('chai').assert;
const users = require('../routes/Users');
const server = require('../server');

describe('User data requesting', function () {
    before(function () {
        server.start();
    });

    after(function () {
        server.close();
    });

    describe('Request dealing with user data ', function () {

        it('Should get all users', async function () {
            await chai.request('http://localhost:80')
                .get('/users')
                .then(res => {
                    expect(res.status).to.equal(200);
                })
                .catch(err => {
                    throw err
                })
        })
    })

    it('Give 404 error when cant get all the users from the routeShould get all users', async function () {
        await chai.request('http://localhost:80')
            .get('/')
            .then(res => {
                expect(res.status).to.equal(404);
            })
            .catch(err => {
                throw err
            })
    })
})