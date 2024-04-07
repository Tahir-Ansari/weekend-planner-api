const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    }],
    equipment: [String],
    tips: [String],
    photos: [String]
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
