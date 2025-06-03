const pool = require('../config/db');

exports.updateUser = async(req,res) => {

const { user_id, f_name, l_name, phone_no, isd_code, country_id, state_id, city_id } = req.body;



try{

    await pool.query('UPDATE user_table SET f_name = $1, l_name = $2, phone_no = $3, isd_code = $4, country_id = $5, state_id = $6, city_id = $7 WHERE user_id = $8 RETURNING *'
        , [f_name, l_name, phone_no, isd_code, country_id, state_id, city_id,  user_id]);
    res.status(200).json({ message: 'User updated!.' });

}catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}


};