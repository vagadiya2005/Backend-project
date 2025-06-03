const express = require('express');
const router = express.Router();
const getLocationHirarchyController = require('../controllers/getLocationHirarchyController');

router.get('/hirarchy',getLocationHirarchyController.getLocationHierarchy);

module.exports = router;
