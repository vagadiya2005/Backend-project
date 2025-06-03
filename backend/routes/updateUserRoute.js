const express = require('express');
const router = express.Router();
const updateUserController = require('../controllers/updateUserController');


router.put('/user/:editingUser', updateUserController.updateUser);


module.exports = router;
