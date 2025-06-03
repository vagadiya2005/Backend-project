const CountryModel = require('../models/countryModel');
const StateModel = require('../models/stateModel');
const CityModel = require('../models/cityModel');

exports.createCountry = async (req, res) => {
  try {
    const { country_name } = req.body;
    const country = await CountryModel.addCountry(country_name);
    res.status(201).json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createState = async (req, res) => {
  try {
    const { state_name, country_id } = req.body;
    const state = await StateModel.addState(state_name, country_id);
    res.status(201).json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCity = async (req, res) => {
  try {
    const { city_name, state_id } = req.body;
    const city = await CityModel.addCity(city_name, state_id);
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
