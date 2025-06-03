const db = require('../config/db');

exports.addCity = async (name, stateId) => {
  const existing = await db.query(
    'SELECT * FROM city_table WHERE LOWER(city_name) = LOWER($1) AND state_id = $2',
    [name, stateId]
  );
  if (existing.rows.length > 0) {
    throw new Error('City already exists for this state');
  }

  const result = await db.query(
    'INSERT INTO city_table (city_name, state_id) VALUES ($1, $2) RETURNING *',
    [name, stateId]
  );
  return result.rows[0];
};

