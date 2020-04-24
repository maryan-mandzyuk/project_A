const { createBook, getBook, getBooks } = require('./books');
const { createSeller, getSeller, getSellers } = require('./sellers');
const { createAuthor, getAuthor, getAuthors } = require('./authors');
const { createPublisher, getPublisher, getPublishers } = require('./publishers');
const { createTranslator, getTranslator, getTranslators } = require('./translators');

module.exports = {
    createBook,
    getBook,
    getBooks,
    createSeller,
    getSeller,
    getSellers,
    createAuthor,
    getAuthor,
    getAuthors,
    createPublisher,
    getPublisher,
    getPublishers,
    createTranslator,
    getTranslator,
    getTranslators,
};
