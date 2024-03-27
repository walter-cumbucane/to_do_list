const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();


router.get('/', usersController.get_all);
router.post('/', usersController.create_user);




module.exports = router;