const express = require('express');
const router = express.Router();
const deleteUserController = require('../controllers/deleteUserController');

router.delete('/user/:id', deleteUserController.deleteUser);

module.exports = router;
