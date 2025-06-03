const express = require('express');
const router = express.Router();
const {
  createCountry,
  createState,
  createCity
} = require('../controllers/addLocationController');

router.post('/add/country', createCountry);
router.post('/add/state', createState);
router.post('/add/city', createCity);

module.exports = router;
