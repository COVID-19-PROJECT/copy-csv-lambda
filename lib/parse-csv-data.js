const csv = require('csvtojson');

const parseCSVData = async (data) => {
  let parse = await csv().fromString(data);

  parse = parse.map((item) => ({
    country: item.Country_Region,
    province: item.Province_State,
    last_updated: item.Last_Update,
    latitude: item.Lat,
    longitude: item.Long_,
    confirmed: item.Confirmed,
    deaths: item.Deaths,
    recovered: item.Recovered,
    active: item.Active,
    combined_key: item.Combined_Key,
  }));


  let countries = parse.map((item) => item.country);
  countries = [...new Set(countries)];

  const result = countries.map((country) => {
    const rows = parse.filter((row) => row.country === country);

    const confirmed = rows
      .map((row) => parseInt(row.confirmed, 10))
      .reduce((prev, next) => prev + next, 0);

    const deaths = rows
      .map((row) => parseInt(row.deaths, 10))
      .reduce((prev, next) => prev + next, 0);

    const recovered = rows
      .map((row) => parseInt(row.recovered, 10))
      .reduce((prev, next) => prev + next, 0);

    const active = rows
      .map((row) => parseInt(row.active, 10))
      .reduce((prev, next) => prev + next, 0);

    const countryInfo = {
      name: country,
      cases: {
        confirmed,
        deaths,
        recovered,
        active,
      },
      provinces: rows,
    };

    return countryInfo;
  });

  return result;
};

module.exports = parseCSVData;
