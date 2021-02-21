const chai = require('chai');
chai.use(require('chai-json-schema'));
const expect = require('chai').expect;
const assert = require('chai').assert;
const users = require('../routes/Users');
const db = require('../server');

describe('User Service', function() {
  before(async function() {
    await db.init('db.test.mongodb');
  });

  after(async function() {
    await db.close();
  });

  describe('Get all users', function() {
    it('Should get an empty array', async function() {
      await users.getAll().then((results) => {
        expect(results).to.be.an('array').that.is.empty;
      });

    });
  });
  
  describe('Create new user', function() {
    it('Should create a new user', async function() {

      await users.createNew({
        name: "testname",
        lastname: "testlastname",
        password: "testPassword",
        email: "test@email.com",
        phonenumber: "040444555"
      }).then(user => {

        expect(user).to.be.jsonSchema(users);

      }).catch((error) => {
        console.log(error);
        assert.fail();
      })
    });
  });
});
