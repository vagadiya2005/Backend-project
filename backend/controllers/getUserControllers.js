// locationController.js
const pool = require('../config/db');

const getUserDetails = async (req, res) => {
  try {
    const userQuery = ` SELECT u.state_id, u.city_id, u.country_id, u.user_id, c.country_name, s.state_name, ci.city_name, 
                        u.f_name, u.l_name, u.pan_no, u.gst_no, u.phone_no, u.isd_code FROM user_table u 
                        inner join state_table s on u.state_id = s.state_id 
                        inner join country_table c on u.country_id = c.country_id 
                        inner join city_table ci on u.city_id = ci.city_id;`;
    const result = await pool.query(userQuery);
    res.json(result.rows);
    
    console.info('Users fetched successfully.')
  } catch (err) {
    console.error('Error fetching location hierarchy:', err);
    res.status(500).json({ error: 'Internal server error' });

  }
};

module.exports = {
  getUserDetails
};
