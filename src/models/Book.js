const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [50, 'Title can not be more than 50 characters'],
        trim: true,
    },
    originalTitle: {
        type: String,
        maxlength: [50, 'Original title can not be more than 50 characters'],
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters'],
    },
    authors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'author',
        },
    ],
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'publisher',
    },
    pageNumber: {
        type: Number,
        max: [5000, 'Number of page can not be more than 5000'],
    },
    translators: [
        {
            type: Schema.Types.ObjectId,
            ref: 'translator',
        },
    ],
    publicationYear: {
        type: String,
        maxlength: [4, 'Year can not be more than 4 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    properties: [
        {
            ISBN: {
                type: String,
                required: [true, 'ISBN is required'],
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
                        required: [true, 'Link is required'],
                        match: [
                            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                            'Please use a valid URL with HTTP or HTTPS',
                        ],
                    },
                    currentPrice: {
                        type: Number,
                        required: [true, 'Current price is required'],
                        max: [5000, 'Current price can not be more than 5000'],
                    },
                    previousPrice: {
                        type: Number,
                        required: [true, 'Previous price is required'],
                        max: [5000, 'Previous price can not be more than 5000'],
                    },
                    minimalPrice: {
                        type: Number,
                        required: [true, 'Minimal price is required'],
                        max: [5000, 'Minimal price can not be more than 5000'],
                    },
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Book', BookSchema);
