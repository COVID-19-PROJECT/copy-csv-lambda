const { expect } = require('chai');
const { useFakeTimers, stub } = require('sinon');
const { readFileSync } = require('fs');
const path = require('path');
const nock = require('nock');
const proxyquire = require('proxyquire').noCallThru();

const lambda = proxyquire('../index', {
  './lib/upload-json-file': stub().returns().resolves({
    ETag: '"a80d9fa7e308c1e2e9adcc35b20906f5"',
  }),
});

const baseURL = 'https://fake.api.com';

describe('Lambda Function', () => {
  let csvResponse;
  let clock;

  before(() => {
    csvResponse = readFileSync(path.join(__dirname, './fixtures/info.csv')).toString('utf8');
  });


  beforeEach(() => {
    clock = useFakeTimers(new Date(2020, 2, 1).getTime());

    nock(baseURL)
      .get('/03-01-2020.csv')
      .reply(200, csvResponse);
  });

  afterEach(() => {
    clock.restore();
  });

  describe('When the handler is called without arguments', () => {
    it('should return a error with message', async () => {
      try {
        await lambda.handler({});

        expect.fail('This scenario no need to pass');
      } catch (error) {
        expect(error.message).to.match(/You need to define baseURL in the payload/);
      }
    });
  });

  describe('When the handler is called with baseURL argument', () => {
    it('should return a ok result', async () => {
      try {
        const response = await lambda.handler({ baseURL });

        expect(response.worked).to.be.equal(3);
        expect(response.message).to.match(/Copy CSV work finish succesfully/);
      } catch (error) {
        expect.fail('We found and error when not be necessary');
      }
    });
  });
});
