const { Author } = require('../models');
const asyncHandler = require('../middleware/async');
const ErrorRespose = require('../utils/errorResponse');

const createAuthor = asyncHandler(async (req, res, next) => {
    const newAuthor = await Author.create(req.body);
    res.status(201).json({
        succes: true,
        data: newAuthor,
    });
});

const getAuthor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
        return next(new ErrorRespose(404, `Author not found with id of ${id} `));
    }

    res.status(200).json({
        success: true,
        data: author,
    });
});

const getAuthors = asyncHandler(async (req, res, next) => {
    const authors = await Author.find();

    res.status(200).json({
        success: true,
        data: authors,
    });
});

module.exports = {
    createAuthor,
    getAuthor,
    getAuthors,
};
