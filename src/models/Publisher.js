const mongoose = require('mongoose');

const { Schema } = mongoose;

const PublisherSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
});

module.exports = mongoose.model('Publisher', PublisherSchema);
