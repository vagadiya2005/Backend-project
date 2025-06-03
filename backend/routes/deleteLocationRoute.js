const express = require('express');
const router = express.Router();
const deleteLocationController = require('../controllers/deleteLocationController');

router.delete('/city/:id', deleteLocationController.deleteCity);

module.exports = router;
