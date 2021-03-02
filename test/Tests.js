const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const server = require('../server');

describe('User signup tests', function () {

    before(function () {
        server.start();
    });

    after(function () {
        server.close();
    });

    it('Get all users', async function () {
        await chai.request('http://localhost:80')
            .get('/users')
            .then(res => {
                expect(res.status).to.equal(200);
            })
            .catch(err => {
                throw err
            })
    })

    it('Create a new user', async function () {
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

    it('Give 400 error when req body info missing when creating new user from the route', async function () {
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
                expect(res.status).to.equal(400);
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
                    passowrd: 'password',
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
         })
    })

    describe('Product services', function () {

        it('Get all products', async function () {
            await chai.request('http://localhost:80')
                .get('/products')
                .then(res => {
                    expect(res.status).to.equal(200);
                })
                .catch(err => {
                    throw err
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
                    price: 10,
                    shippig: true,
                    pickup: false
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
                    description: 'description',
                    category: 'testcategory',
                    location: 'testlocation',
                    price: 10,
                    shippig: true,
                    pickup: false
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                })
        })
    })
})