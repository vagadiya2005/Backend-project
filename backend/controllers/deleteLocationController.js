// controllers/locationController.js
const pool = require('../config/db');

exports.deleteCity = async (req, res) => {
  const cityId = req.params.id;

  try {
    // 1. Get the state and country IDs associated with the city
    const cityResult = await pool.query(
      'SELECT state_id FROM city_table WHERE city_id = $1',
      [cityId]
    );
    if (cityResult.rows.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }

    const stateId = cityResult.rows[0].state_id;

    // Delete the city
    await pool.query('DELETE FROM city_table WHERE city_id = $1', [cityId]);

    // Check if the state has any remaining cities
    const remainingCities = await pool.query(
      'SELECT * FROM city_table WHERE state_id = $1',
      [stateId]
    );

    if (remainingCities.rows.length === 0) {
      // Get country_id for that state
      const stateResult = await pool.query(
        'SELECT country_id FROM state_table WHERE state_id = $1',
        [stateId]
      );
      const countryId = stateResult.rows[0].country_id;

      // Delete the state
      await pool.query('DELETE FROM state_table WHERE state_id = $1', [stateId]);

      // Check if country has any remaining states
      const remainingStates = await pool.query(
        'SELECT * FROM state_table WHERE country_id = $1',
        [countryId]
      );

      if (remainingStates.rows.length === 0) {
        // Delete the country
        await pool.query('DELETE FROM country_table WHERE country_id = $1', [countryId]);
      }
    }

    res.status(200).json({ message: 'City (and possibly state/country) deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
