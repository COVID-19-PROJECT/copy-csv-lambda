const { expect } = require('chai');
const { plus } = require('../../lib/math');

describe('Math lib', () => {
  describe('when plus method is called with (5,5)', () => {
    it('should return 10 for the plus result', () => {
      const result = plus(5, 5);

      expect(result).to.be.equal(10);
    });
  });
});
