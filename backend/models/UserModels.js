const db = require('../config/db');

const addUser = async (user) => {
  try {
    console.log("user in model: ", user);

    // First check if PAN already exists
    const panCheckQuery = `
      SELECT user_id FROM user_table WHERE pan_no = $1;
    `;
    const panCheckResult = await db.query(panCheckQuery, [user.pan_number]);

    if (panCheckResult.rows.length > 0) {
      throw new Error('PAN number already exists in the database');
    }

    // If PAN doesn't exist, proceed with insertion
    const insertQuery = `
      INSERT INTO user_table (
        f_name, l_name, phone_no, isd_code, pan_no, gst_no,
        country_id, state_id, city_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      user.f_name,
      user.l_name,
      user.phone_no,
      user.isd_no,
      user.pan_number,
      user.gst_number,
      user.country_id,
      user.state_id,
      user.city_id
    ];

    const result = await db.query(insertQuery, values);

    console.info('Data inserted at addUser Model:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addUser model:", error);
    throw error; // Rethrow to be caught by controller
  }
};

module.exports = { addUser };