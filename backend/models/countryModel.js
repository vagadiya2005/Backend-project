const db = require('../config/db');

exports.addCountry = async (name) => {
  const existing = await db.query(
    'SELECT * FROM country_table WHERE LOWER(country_name) = LOWER($1)',
    [name]
  );
  if (existing.rows.length > 0) {
    throw new Error('Country already exists');
  }

  const result = await db.query(
    'INSERT INTO country_table (country_name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};
