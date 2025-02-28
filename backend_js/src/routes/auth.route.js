const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUserDetails);

module.exports = router;
