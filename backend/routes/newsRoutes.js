const express = require('express');
const router = express.Router();
const { getNews, createNews, getNewsByDate } = require('../controllers/newsController');

router.get('/', getNews);
router.post('/', createNews);
router.get('/by-date', getNewsByDate); // New route

module.exports = router;
