const mongoose = require('mongoose');

const { Schema } = mongoose;

const SellerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Seller name is required'],
        maxlength: [50, 'Seller name can not be more than 50 characters'],
    },
    site: {
        type: String,
        required: [true, 'Link to seller site is required'],
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS',
        ],
    },
});

module.exports = mongoose.model('Seller', SellerSchema);
