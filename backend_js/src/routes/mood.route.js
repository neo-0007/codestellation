const express = require('express');
const router = express.Router();
const { determineMoodUsingChats } = require('../controllers/mood.controller');

router.post('/bychats', determineMoodUsingChats);

module.exports = router;
