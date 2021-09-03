const express = require('express');
const router = express.Router();

const UsersController = require("./../controllers/users");

// API: /api/users/:id to get the details of a user by the user ID.
router.get('/:id', UsersController.getUserByID);

// API: /api/users/register to create a new user and generate the JWT.
router.post('/register', UsersController.createUser);

module.exports = router;