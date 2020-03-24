const getCSVFilename = () => {
  const actualDate = new Date();

  const date = `0${actualDate.getDate()}`.slice(-2);
  const month = `0${(actualDate.getMonth() + 1)}`.slice(-2);
  const year = actualDate.getFullYear();

  return `${month}-${date}-${year}.csv`;
};

module.exports = getCSVFilename;
