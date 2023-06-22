const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/mock', userController.generateUsers);
router.delete('/', userController.deleteUsers);

module.exports = router;
