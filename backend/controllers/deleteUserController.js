const pool = require('../config/db');

exports.deleteUser = async (req, res) => {

    const userId = req.params.id;

 try {

    // Delete the user
    await pool.query('DELETE FROM user_table WHERE user_id = $1', [userId]);
    res.status(200).json({ message: 'User deleted.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};