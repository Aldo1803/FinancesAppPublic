const mongoose = require('mongoose');

var monthlySchema = new mongoose.Schema({
    utilities: {
        type: Number,
        required: true
    },
    cutoff_date: {
        type: Date,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    spend: {
        type: Number,
        required: true
    },
    monthSpend: {
        type: Array,  // Consider refining the type here
        required: true
    },
    monthIncome: {
        type: Array,  // Consider refining the type here
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Monthly', monthlySchema);
