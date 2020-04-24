const express = require('express');
const { createAuthor, getAuthor, getAuthors } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(getAuthors)
    .post(createAuthor);

router.route('/:id').get(getAuthor);

module.exports = router;
