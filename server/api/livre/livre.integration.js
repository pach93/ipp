'use strict';

var app = require('../..');
import request from 'supertest';

var newLivre;

describe('Livre API:', function() {
  describe('GET /api/livres', function() {
    var livres;

    beforeEach(function(done) {
      request(app)
        .get('/api/livres')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          livres = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      livres.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/livres', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/livres')
        .send({
          name: 'New Livre',
          info: 'This is the brand new livre!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLivre = res.body;
          done();
        });
    });

    it('should respond with the newly created livre', function() {
      newLivre.name.should.equal('New Livre');
      newLivre.info.should.equal('This is the brand new livre!!!');
    });
  });

  describe('GET /api/livres/:id', function() {
    var livre;

    beforeEach(function(done) {
      request(app)
        .get(`/api/livres/${newLivre._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          livre = res.body;
          done();
        });
    });

    afterEach(function() {
      livre = {};
    });

    it('should respond with the requested livre', function() {
      livre.name.should.equal('New Livre');
      livre.info.should.equal('This is the brand new livre!!!');
    });
  });

  describe('PUT /api/livres/:id', function() {
    var updatedLivre;

    beforeEach(function(done) {
      request(app)
        .put(`/api/livres/${newLivre._id}`)
        .send({
          name: 'Updated Livre',
          info: 'This is the updated livre!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLivre = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLivre = {};
    });

    it('should respond with the original livre', function() {
      updatedLivre.name.should.equal('New Livre');
      updatedLivre.info.should.equal('This is the brand new livre!!!');
    });

    it('should respond with the updated livre on a subsequent GET', function(done) {
      request(app)
        .get(`/api/livres/${newLivre._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let livre = res.body;

          livre.name.should.equal('Updated Livre');
          livre.info.should.equal('This is the updated livre!!!');

          done();
        });
    });
  });

  describe('PATCH /api/livres/:id', function() {
    var patchedLivre;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/livres/${newLivre._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Livre' },
          { op: 'replace', path: '/info', value: 'This is the patched livre!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLivre = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLivre = {};
    });

    it('should respond with the patched livre', function() {
      patchedLivre.name.should.equal('Patched Livre');
      patchedLivre.info.should.equal('This is the patched livre!!!');
    });
  });

  describe('DELETE /api/livres/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/livres/${newLivre._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when livre does not exist', function(done) {
      request(app)
        .delete(`/api/livres/${newLivre._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
