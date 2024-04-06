const express = require('express');
const tasksController = require('../controllers/tasks');
const check_auth = require('../utilities/check_auth');

const router = express.Router();


router.get('/', check_auth, tasksController.get_all);
router.get('/:id', check_auth, tasksController.get_one);
router.post('/', check_auth, tasksController.create_task);
router.delete('/:id', check_auth, tasksController.delete_task);




module.exports = router;