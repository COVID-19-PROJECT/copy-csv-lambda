const { plus } = require('./lib/math');

module.exports.handler = (event, context, callback) => {
  const firstNumber = event.first || 0;
  const secondNumber = event.second || 0;

  const result = plus(firstNumber, secondNumber);

  callback(null, result);
};
