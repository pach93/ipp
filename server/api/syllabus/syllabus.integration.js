'use strict';

var app = require('../..');
import request from 'supertest';

var newSyllabus;

describe('Syllabus API:', function() {
  describe('GET /api/syllabuses', function() {
    var syllabuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/syllabuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          syllabuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      syllabuss.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/syllabuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/syllabuses')
        .send({
          name: 'New Syllabus',
          info: 'This is the brand new syllabus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSyllabus = res.body;
          done();
        });
    });

    it('should respond with the newly created syllabus', function() {
      newSyllabus.name.should.equal('New Syllabus');
      newSyllabus.info.should.equal('This is the brand new syllabus!!!');
    });
  });

  describe('GET /api/syllabuses/:id', function() {
    var syllabus;

    beforeEach(function(done) {
      request(app)
        .get(`/api/syllabuses/${newSyllabus._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          syllabus = res.body;
          done();
        });
    });

    afterEach(function() {
      syllabus = {};
    });

    it('should respond with the requested syllabus', function() {
      syllabus.name.should.equal('New Syllabus');
      syllabus.info.should.equal('This is the brand new syllabus!!!');
    });
  });

  describe('PUT /api/syllabuses/:id', function() {
    var updatedSyllabus;

    beforeEach(function(done) {
      request(app)
        .put(`/api/syllabuses/${newSyllabus._id}`)
        .send({
          name: 'Updated Syllabus',
          info: 'This is the updated syllabus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSyllabus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSyllabus = {};
    });

    it('should respond with the original syllabus', function() {
      updatedSyllabus.name.should.equal('New Syllabus');
      updatedSyllabus.info.should.equal('This is the brand new syllabus!!!');
    });

    it('should respond with the updated syllabus on a subsequent GET', function(done) {
      request(app)
        .get(`/api/syllabuses/${newSyllabus._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let syllabus = res.body;

          syllabus.name.should.equal('Updated Syllabus');
          syllabus.info.should.equal('This is the updated syllabus!!!');

          done();
        });
    });
  });

  describe('PATCH /api/syllabuses/:id', function() {
    var patchedSyllabus;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/syllabuses/${newSyllabus._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Syllabus' },
          { op: 'replace', path: '/info', value: 'This is the patched syllabus!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSyllabus = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSyllabus = {};
    });

    it('should respond with the patched syllabus', function() {
      patchedSyllabus.name.should.equal('Patched Syllabus');
      patchedSyllabus.info.should.equal('This is the patched syllabus!!!');
    });
  });

  describe('DELETE /api/syllabuses/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/syllabuses/${newSyllabus._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when syllabus does not exist', function(done) {
      request(app)
        .delete(`/api/syllabuses/${newSyllabus._id}`)
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
