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
      .reduce((prev, next) => parseInt(prev.confirmed + next.confirmed, 10), { confirmed: 0 });

    const deaths = rows
      .reduce((prev, next) => parseInt(prev.deaths + next.deaths, 10), { deaths: 0 });

    const recovered = rows
      .reduce((prev, next) => parseInt(prev.recovered + next.recovered, 10), { recovered: 0 });

    const active = rows
      .reduce((prev, next) => parseInt(prev.active + next.active, 10), { active: 0 });

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
