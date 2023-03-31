const express = require('express');
const router = express.Router();

// use the user controller
const userController = require('../controllers/userController');

// setup the routes with apropiate naming like 'api/v1/users'
router.post('/', userController.createUser);
router.get('/', userController.getUsers);

// routes to generate mock data
router.get('/generate', userController.generateUsers);

// routes to delete all users
router.delete('/all', userController.deleteAllUsers);

module.exports = router;
