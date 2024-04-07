const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destinations'
    }],
    planned_activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activities'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

const User = mongoose.model('users', userSchema);

module.exports = User;
