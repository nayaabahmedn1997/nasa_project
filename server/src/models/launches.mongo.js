const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    destination: {
        type: mongoose.Schema.ObjectId,
        ref: 'Planet',
        required: true
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
    customers: {
        type: [String]
    }
});


const launchModel = mongoose.model('Launch', launchesSchema);

module.exports = {
    launchModel
}
