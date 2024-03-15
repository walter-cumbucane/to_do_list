const express = require('express');
const tasksController = require('../controllers/tasks');

const router = express.Router();


router.get('/', tasksController.get_all);



module.exports = router;