const mongoose = require('mongoose');

const { Schema } = mongoose;

const SellerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Seller name is required'],
        maxlength: [50, 'Seller name can not be more than 50 characters'],
    },
    site: {
        url: {
            type: String,
            required: [true, 'Link to seller site is required'],
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS',
            ],
        },
        selectors: {
            listItems: String,
            listBookLink: String,
            tablePropAttr: String,
            tablePropValue: String,
            infoTableRows: String,
            title: String,
            imageLink: String,
            auhor: String,
            publisher: String,
            publicationYear: String,
            isbn: String,
            pageNumber: String,
            translator: String,
            originalTitle: String,
            paperPrice: String,
            ebookPrice: String,
            paperLink: String,
            ebookLink: String,
            checkIfPaper: String,
        },
    },
});

module.exports = mongoose.model('Seller', SellerSchema);
