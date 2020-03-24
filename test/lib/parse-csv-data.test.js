const { expect } = require('chai');
const { readFileSync } = require('fs');
const path = require('path');

const parseCSVData = require('../../lib/parse-csv-data');

const expectRowGuatemala = {
  name: 'Guatemala',
  cases: {
    confirmed: 20,
    deaths: 1,
    recovered: 0,
    active: 19,
  },
  provinces: [
    {
      country: 'Guatemala',
      province: '',
      last_updated: '2020-03-23 23:19:21',
      latitude: '15.7835',
      longitude: '-90.2308',
      confirmed: '20',
      deaths: '1',
      recovered: '0',
      active: '19',
      combined_key: 'Guatemala',
    },
  ],
};

describe('parseCSVData lib', () => {
  let csvString;

  before(() => {
    csvString = readFileSync(path.join(__dirname, '../fixtures/info.csv')).toString('utf8');
  });

  describe('when the lib parse CSV String', async () => {
    it('should return a object with expected format', async () => {
      const parse = await parseCSVData(csvString);

      expect(Array.isArray(parse)).to.be.true;
      expect(parse.length).to.be.equal(3);
      expect(parse[2]).to.be.deep.equal(expectRowGuatemala);
    });
  });
});
