const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    userName: {
        type: String
    }
});

module.exports = mongoose.model('Category', categorySchema);
