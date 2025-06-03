const db = require('../config/db');

exports.addState = async (name, countryId) => {
  const existing = await db.query(
    'SELECT * FROM state_table WHERE LOWER(state_name) = LOWER($1) AND country_id = $2',
    [name, countryId]
  );
  if (existing.rows.length > 0) {
    throw new Error('State already exists for this country');
  }

  const result = await db.query(
    'INSERT INTO state_table (state_name, country_id) VALUES ($1, $2) RETURNING *',
    [name, countryId]
  );
  return result.rows[0];
};

