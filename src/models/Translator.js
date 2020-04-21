const mongoose = require('mongoose');

const { Schema } = mongoose;

const TranslatorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: [30, 'Translator first name can not be more than 30 characters'],
    },
    lastName: {
        type: String,
        required: true,
        maxlength: [30, 'Translator last name can not be more than 30 characters'],
    },
});

module.exports = mongoose.model('Translator', TranslatorSchema);
