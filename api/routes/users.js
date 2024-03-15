const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();


router.get('/', usersController.get_all);




module.exports = router;