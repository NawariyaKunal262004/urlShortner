const express = require('express');
const { handlegenerateNewShortURL, handleGetAnalytics } = require('../controllers/url-controller.js');
const router = express.Router();

router.post('/', handlegenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;