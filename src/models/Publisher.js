const mongoose = require('mongoose');

const { Schema } = mongoose;

const PublisherSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Publisher name is required'],
        maxlength: [50, 'Publisher name can not be more than 50 characters'],
    },
});

module.exports = mongoose.model('Publisher', PublisherSchema);
