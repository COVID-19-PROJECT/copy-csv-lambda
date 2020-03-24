const getCSVFilename = require('./lib/get-csv-filename');
const downloadCSVFile = require('./lib/download-csv-file');
const parseCSVData = require('./lib/parse-csv-data');
const uploadJSONFile = require('./lib/upload-json-file');

module.exports.handler = async (event) => {
  try {
    const { baseURL } = event;

    if (!baseURL || String(baseURL).length === 0) {
      throw new Error('You need to define baseURL in the payload');
    }

    const filename = getCSVFilename();
    const csvUrl = `${baseURL}/${filename}`;
    const data = await downloadCSVFile(csvUrl);
    const parse = await parseCSVData(data);
    const response = await uploadJSONFile(filename, parse);

    return Promise.resolve({
      tag: response.ETag,
      worked: parse.length,
      message: 'Copy CSV work finish succesfully',
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
