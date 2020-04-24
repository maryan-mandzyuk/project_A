const { Publisher } = require('../models');
const asyncHandler = require('../middleware/async');
const ErrorRespose = require('../utils/errorResponse');

const createPublisher = asyncHandler(async (req, res, next) => {
    const newPublisher = await Publisher.create(req.body);
    res.status(201).json({
        succes: true,
        data: newPublisher,
    });
});

const getPublisher = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const publisher = await Publisher.findById(id);

    if (!publisher) {
        return next(new ErrorRespose(404, `Publisher not found with id of ${id} `));
    }

    res.status(200).json({
        success: true,
        data: publisher,
    });
});

const getPublishers = asyncHandler(async (req, res, next) => {
    const publishers = await Publisher.find();

    res.status(200).json({
        success: true,
        data: publishers,
    });
});

module.exports = {
    createPublisher,
    getPublisher,
    getPublishers,
};
