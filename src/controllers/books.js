const Book = require('../models/Book');
const asyncHandler = require('../middleware/async');

const createBook = asyncHandler(async (req, res, next) => {
    const newBook = await Book.create(req.body);
    res.status(201).json({
        succes: true,
        data: newBook,
    });
});

module.exports = {
    createBook,
};
