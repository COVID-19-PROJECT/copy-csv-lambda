const AWS = require('aws-sdk');

const S3 = new AWS.S3();

const uploadJSONFile = async (data) => {
  const params = {
    Bucket: 'gt-covid19-data',
    Key: 'covid19-data.json',
    Body: JSON.stringify(data),
  };

  return S3.upload(params).promise();
};

module.exports = uploadJSONFile;
