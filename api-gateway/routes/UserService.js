const express = require('express');
const router = express.Router();

const UserServiceComponent = require('../components/UserServiceComponent');

router.get('/getUserByID/:userID', UserServiceComponent.getUserByID);

router.post('/createUser/', UserServiceComponent.createUser);

module.exports = router;