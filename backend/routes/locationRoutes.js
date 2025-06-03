const express = require('express');
const router = express.Router();
const db = require('../config/db');
const getLocationHierarchy = require('../controllers/getLocationHirarchyController');

// Get all countries
router.get('/countries', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM country_table');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all states for a given country
router.get('/states/:countryId', async (req, res) => {
  try {
    const { countryId } = req.params;
    const result = await db.query(
      'SELECT * FROM state_table WHERE country_id = $1',
      [countryId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all cities for a given state
router.get('/cities/:stateId', async (req, res) => {
  try {
    const { stateId } = req.params;
    const result = await db.query(
      'SELECT * FROM city_table WHERE state_id = $1',
      [stateId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
