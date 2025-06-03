// locationController.js
const pool = require('../config/db');

const getLocationHierarchy = async (req, res) => {
  try {
    const countryQuery = `
      SELECT 
        c.country_id, c.country_name,
        s.state_id, s.state_name,
        ci.city_id, ci.city_name
      FROM country_table c
      LEFT JOIN state_table s ON s.country_id = c.country_id
      LEFT JOIN city_table ci ON ci.state_id = s.state_id
      ORDER BY c.country_name, s.state_name, ci.city_name;
    `;

    const result = await pool.query(countryQuery);

    const hierarchy = {};

    result.rows.forEach(row => {
      const { country_id, country_name, state_id, state_name, city_id, city_name } = row;

      if (!hierarchy[country_id]) {
        hierarchy[country_id] = {
          country_id,
          country_name,
          states: {}
        };
      }

      if (state_id && !hierarchy[country_id].states[state_id]) {
        hierarchy[country_id].states[state_id] = {
          state_id,
          state_name,
          cities: []
        };
      }

      if (state_id && city_id) {
        hierarchy[country_id].states[state_id].cities.push({ city_id, city_name });
      }
    });

    const response = Object.values(hierarchy).map(country => ({
      ...country,
      states: Object.values(country.states)
    }));

    res.json(response);
  } catch (err) {
    console.error('Error fetching location hierarchy:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getLocationHierarchy
};
