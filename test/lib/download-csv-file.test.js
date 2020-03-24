const { expect } = require('chai');
const { readFileSync } = require('fs');
const path = require('path');
const nock = require('nock');

const downloadCSVFile = require('../../lib/download-csv-file');

describe('downloadCSVFile lib', () => {
  let csvResponse;

  before(() => {
    csvResponse = readFileSync(path.join(__dirname, '../fixtures/info.csv')).toString('utf8');
  });


  beforeEach(() => {
    nock('https://fake.api.com')
      .get('/data')
      .reply(200, csvResponse);

    nock('https://fake.api.com')
      .get('/notfound')
      .reply(404);
  });

  describe('when request to download CSV file with empty url', () => {
    it('should return and error', async () => {
      try {
        await downloadCSVFile('');

        expect.fail('The call dont return and error');
      } catch (error) {
        expect(error.message).to.match(/Only absolute URLs are supported/);
      }
    });
  });

  describe('when request to download CSV file return and error', () => {
    it('should return and error', async () => {
      try {
        await downloadCSVFile('https://fake.api.com/notfound');

        expect.fail('The call dont return and error');
      } catch (error) {
        expect(error.message).to.match(/Not Found/);
      }
    });
  });

  describe('when request to download CSV file with correct url', () => {
    it('should return and response string', async () => {
      try {
        const data = await downloadCSVFile('https://fake.api.com/data');

        expect(typeof data).to.be.equal('string');
      } catch (error) {
        expect.fail('The call return and error');
      }
    });
  });
});
