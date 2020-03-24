const { expect } = require('chai');
const { useFakeTimers } = require('sinon');
const getCSVFilename = require('../../lib/get-csv-filename');

describe('getCSVFilename lib', () => {
  let clock;

  beforeEach(() => {
    // We set a fake time to Date constructor 2020-03-01
    clock = useFakeTimers(new Date(2020, 2, 1).getTime());
  });

  afterEach(() => {
    // We restore the clock to no affect another tests.
    clock.restore();
  });

  describe('when getCSVFilename is called', () => {
    it('should return csv file with date 03-01-2020.csv', () => {
      const filename = getCSVFilename();

      expect(filename).to.be.equal('03-01-2020.csv');
    });
  });
});
