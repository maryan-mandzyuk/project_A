const Book = require('../models/Book');
const asyncHandler = require('../middleware/async');
const ErrorRespose = require('../utils/errorResponse');

const createBook = asyncHandler(async (req, res, next) => {
    const newBook = await Book.create(req.body);
    res.status(201).json({
        succes: true,
        data: newBook,
    });
});

const getBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorRespose(404, `Book not found with id of ${id} `));
    }

    res.status(200).json({
        success: true,
        data: book,
    });
});

const getBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        data: books,
    });
});

module.exports = {
    createBook,
    getBook,
    getBooks,
};
