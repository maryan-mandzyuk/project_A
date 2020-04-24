const express = require('express');
const { createTranslator, getTranslator, getTranslators } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(getTranslators)
    .post(createTranslator);

router.route('/:id').get(getTranslator);

module.exports = router;
