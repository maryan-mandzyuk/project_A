const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Author first name is required'],
        maxlength: [50, 'Author first name can not be more than 30 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Author last name is required'],
        maxlength: [50, 'Author last name can not be more than 30 characters'],
    },
});

module.exports = mongoose.model('Author', AuthorSchema);
