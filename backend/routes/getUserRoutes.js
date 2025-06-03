const express = require('express');
const router = express.Router();
const getUserDetails = require('../controllers/getUserControllers');

router.get('/users',getUserDetails.getUserDetails);

module.exports = router;
