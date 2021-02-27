const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const server = require('../server');

describe('Product Service', function () {
  before(function () {
    server.start();
  });

  after(async function () {
    server.close();
  });

  describe('Product services for the user ', function () {

    it('Should get all products from the route', async function () {
      await chai.request('http://localhost:80').get('/products')
        .then(res => {
          expect(res.status).to.equal(200);
        })
        .catch(err => {
          throw err;
        })
    })

    it('Returns error 404 when route cannot get all products from the route', async function () {
      await chai.request('http://localhost:80')
        .get('/')
        .then(res => {
          expect(res.status).to.equal(404);
        })
        .catch(err => {
          throw err;
        })
    })

    it('Should create a new product', async function () {
      await chai.request('http://localhost:80')
        .post('/products')
        .send({
          title: 'testtitle',
          description: 'testdescription',
          category: 'testcategory',
          location: 'testlocation',
          productImg: 'testimage.jpg',
          price: 10,
          deliveryType: 'testdeliverytype'
        })
        .then(res => { 
          expect(res.status).to.equal(200);
        })
        .catch(err => {
          throw err;
        })
      })

    it('Should return 400 with missing fields in req body', async function () {
      await chai.request('http://localhost:80')
        .post('/products')
        .send({
          title: '',
          description: '',
          category: 'testcategory',
          location: 'testlocation',
          productImg: '',
          price: 10,
          deliveryType: 'testdeliverytype'
        })
        .then(res => {
          expect(res.status).to.equal(401);
        })
        .catch(err => {
          throw err;
        })
    })
    })
});

