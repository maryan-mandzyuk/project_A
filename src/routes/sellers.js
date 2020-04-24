const express = require('express');
const { createSeller, getSellers, getSeller } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(createSeller)
    .get(getSellers);

router.route('/:id').get(getSeller);

module.exports = router;
