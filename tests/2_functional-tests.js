const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { mockRespone } = require('./mocks')

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
  suite('Convert a valid input such as 10L: GET request to /api/convert', () => {
    test('/api/convert?input=10L', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end((err, res) => {
          assert.equal(res.status, 200, 'res status should be 200');
          assert.deepEqual(res.text, mockRespone, 'res status should be 200');
          done()
        })
    });
  });
  suite('Convert an invalid input such as 32g: GET request to /api/convert', () => {
    test('/api/convert?input=32g', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end((err, res) => {
          assert.equal(res.status, 200, 'res status should be 200');
          assert.equal(res.text, 'invalid unit');
          done()
        })
    });

  });
  suite('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', () => {
    test('/api/convert?input=3/7.2/4kg', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
          assert.equal(res.status, 200, 'res status should be 200');
          assert.equal(res.text, 'invalid number');
          done()
        })
    });
  });
  suite('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', () => {
    test('/api/convert?input=3/7.2/4kilomegagram', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
          assert.equal(res.status, 200, 'res status should be 200');
          assert.equal(res.text, 'invalid number and unit');
          done()
        })
    });
  });
  suite('Convert with no number such as kg: GET request to /api/convert', () => {
    test('/api/convert?input=kg', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end((err, res) => {
          assert.equal(res.status, 200, 'res status should be 200');
          done()
        })
    });
  });
});
