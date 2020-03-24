const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');

let uploadJSONFile;
const uploadStub = sinon.stub().returns({
  promise: sinon.stub().resolves({
    ETag: '"a80d9fa7e308c1e2e9adcc35b20906f5"',
  }),
});

describe('uploadJSONFile lib', () => {
  beforeEach(() => {
    uploadJSONFile = proxyquire('../../lib/upload-json-file', {
      'aws-sdk': {
        S3: sinon.stub().returns({
          upload: uploadStub,
        }),
      },
    });
  });

  describe('when the lib receive a filename and data', () => {
    it('should return ok response with expected data', async () => {
      const response = await uploadJSONFile({ a: 1 });

      expect(response.ETag).to.be.equal('"a80d9fa7e308c1e2e9adcc35b20906f5"');
    });
  });
});
