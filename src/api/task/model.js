const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Task', taskSchema);
