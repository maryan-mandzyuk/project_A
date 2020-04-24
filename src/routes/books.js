const express = require('express');
const { createBook, getBook, getBooks } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(getBooks)
    .post(createBook);

router.route('/:id').get(getBook);

module.exports = router;
