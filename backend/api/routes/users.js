const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
const checkAuth = require('../utilities/check_auth');


router.get('/', checkAuth, usersController.get_all);
router.post('/signup', usersController.create_user);
router.get('/:id', checkAuth, usersController.get_one);
router.delete('/:id', checkAuth, usersController.deleteUser);
router.post('/login', usersController.login);




module.exports = router;