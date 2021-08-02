const supertest  = require('supertest');
const {server} = require('../index'); //reference to you app.js file
const  mongoose  = require('../database');
const {authTest} = require('./pruebas/authTest')
//==================== user API test ====================

/**
 * Testing el framework
 */
 describe('Si este test falla, la api no esta funcionando', function () {
    it('debe responder con un json', function (done) {
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
//pruebas al modulo de autenticacion
authTest(server)

after(function (done) {
    server.close(function () {
        mongoose.connection.close(done)
    })
})