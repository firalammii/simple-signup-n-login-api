
const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    fn: {
        type: String,
        required: true
    },
    ln: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    registeredDate: {
        type: Date,
        default: new Date()
    }
});

const PersonModel = mongoose.model('people', personSchema);

module.exports = PersonModel;