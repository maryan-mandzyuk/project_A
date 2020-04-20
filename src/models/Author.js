const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50,
    },
});

module.exports = mongoose.model('Author', AuthorSchema);
