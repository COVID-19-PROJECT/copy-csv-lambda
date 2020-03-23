const { expect } = require('chai');
const lambda = require('../index');

describe('Lambda Function', () => {
  describe('When the handler is called without arguments', () => {
    it('should return a 0 result in the callback', () => {
      lambda.handler({}, {}, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.equal(0);
      });
    });
  });

  describe('When the handler is called with arguments 8 , 5', () => {
    it('should return a 0 result in the callback', () => {
      lambda.handler({ first: 8, second: 5 }, {}, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.equal(13);
      });
    });
  });
});
