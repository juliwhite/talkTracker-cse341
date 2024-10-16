// models/Child.js
const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: String, required: true },
    class: { type: String, required: true },
    favoriteTreat: { type: String, required: true },
    talksGiven: { type: Number, default: 0 },
});

// Export the model
module.exports = mongoose.model('Child', childSchema);