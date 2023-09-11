const mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sku: {
        type: String
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);
