const express = require('express');
const router = express.Router();
const locationController = require('../controllers/editLocationController');


router.put('/country/:country_id', locationController.updateCountry);
router.put('/state/:state_id', locationController.updateState);
router.put('/city/:city_id', locationController.updateCity);

module.exports = router;
