'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var livreCtrlStub = {
  index: 'livreCtrl.index',
  show: 'livreCtrl.show',
  create: 'livreCtrl.create',
  upsert: 'livreCtrl.upsert',
  patch: 'livreCtrl.patch',
  destroy: 'livreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var livreIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './livre.controller': livreCtrlStub
});

describe('Livre API Router:', function() {
  it('should return an express router instance', function() {
    livreIndex.should.equal(routerStub);
  });

  describe('GET /api/livres', function() {
    it('should route to livre.controller.index', function() {
      routerStub.get
        .withArgs('/', 'livreCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/livres/:id', function() {
    it('should route to livre.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'livreCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/livres', function() {
    it('should route to livre.controller.create', function() {
      routerStub.post
        .withArgs('/', 'livreCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/livres/:id', function() {
    it('should route to livre.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'livreCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/livres/:id', function() {
    it('should route to livre.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'livreCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/livres/:id', function() {
    it('should route to livre.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'livreCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
