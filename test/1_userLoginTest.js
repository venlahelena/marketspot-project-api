const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const assert = require('chai').assert;
const users = require('../routes/Users');
const server = require('../server');

describe('User logout', function () {
  before(function () {
    server.start();
  });

  after(function () {
    server.close();
  });

  it('Should login user', async function () {
      await chai.request('http://localhost:80')
        .post('/login')
        .send({
          email: 'test@email.com',
          passowrd: 'testpassword',
        })
        .then(res => {
            expect(res.status).to.equal(200);
        })
        .catch(err => {
            throw err;
      })
  })

  it('Should give 400 error if user login information is missing on incorrect', async function () {
      await chai.request('http://localhost:80')
         .post('/login')
          .send({
             email: '',
             passowrd: '',
         })
       .then(res => {
           expect(res.status).to.equal(400);
      })
       .catch(err => {
         throw err;
    })
  })
})