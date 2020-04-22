const express = require('express');
const { createBook } = require('../controllers/books');

const router = express.Router();

router.post(createBook);

module.exports = router;
