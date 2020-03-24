const fetch = require('node-fetch');

const downloadCSVFile = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.text();
    }

    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = downloadCSVFile;
