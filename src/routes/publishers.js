const express = require('express');
const { createPublisher, getPublisher, getPublishers } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(getPublishers)
    .post(createPublisher);

router.route('/:id').get(getPublisher);

module.exports = router;
