const mongoose = require('mongoose');

const { Schema } = mongoose;

const SellerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    site: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Seller', SellerSchema);
