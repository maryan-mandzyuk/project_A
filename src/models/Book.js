const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    originalTitle: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
        maxlength: 255,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'publisher',
    },
    pageNuber: {
        type: Number,
        max: 5000,
    },
    translator: {
        type: String,
        maxlength: 50,
    },
    publicationYear: {
        type: String,
        maxlength: 4,
    },
    properties: [
        {
            ISBN: {
                type: String,
                required: true,
                unique: true,
            },
            format: {
                type: String,
                enum: ['ebook', 'paper'],
            },
            sellers: [
                {
                    seller: {
                        type: Schema.Types.ObjectId,
                        ref: 'seller',
                    },
                    link: {
                        type: String,
                        required: true,
                    },
                    currentPrice: {
                        type: Number,
                        required: true,
                        max: 5000,
                    },
                    previousPrice: {
                        type: Number,
                        required: true,
                        max: 5000,
                    },
                    minimalPrice: {
                        type: Number,
                        required: true,
                        max: 5000,
                    },
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Book', BookSchema);
