const express = require('express');
const storeUserMentalData = require('../controllers/store.controller');
const router = express.Router();

router.post('/user/data/:id', storeUserMentalData);

module.exports = router;
