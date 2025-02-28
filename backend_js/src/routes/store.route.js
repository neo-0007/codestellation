const express = require('express');
const {storeUserMentalData, getUserMentalHistory} = require('../controllers/store.controller');
const router = express.Router();

router.post('/user/data/:id', storeUserMentalData);
router.get('/user/data/:id', getUserMentalHistory);

module.exports = router;
