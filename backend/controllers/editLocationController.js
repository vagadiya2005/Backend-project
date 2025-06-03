const pool = require('../config/db');

// Update country
exports.updateCountry = async (req, res) => {
  const { country_id } = req.params;
  const { country_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE country_table SET country_name = $1 WHERE country_id = $2 RETURNING *',
      [country_name, country_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update country' });
  }
};

// Update state
exports.updateState = async (req, res) => {
  const { state_id } = req.params;
  const { state_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE state_table SET state_name = $1 WHERE state_id = $2 RETURNING *',
      [state_name, state_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update state' });
  }
};

// Update city
exports.updateCity = async (req, res) => {
  const { city_id } = req.params;
  const { city_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE city_table SET city_name = $1 WHERE city_id = $2 RETURNING *',
      [city_name, city_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update city' });
  }
};
