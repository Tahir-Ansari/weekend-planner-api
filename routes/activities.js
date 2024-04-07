const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');

/// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new activity
router.post('/', async (req, res) => {
    try {
        const { name, description, destinations, equipment, tips, photos } = req.body;
        
        // Validate required fields
        if (!name || !description || !destinations) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new activity
        const newActivity = new Activity({
            name,
            description,
            destinations,
            equipment: equipment || [],
            tips: tips || [],
            photos: photos || []
        });

        // Save the activity to the database
        await newActivity.save();

        res.status(201).json({ message: 'Activity created successfully', activity: newActivity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update activity by ID
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity updated successfully', activity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete activity by ID
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity deleted successfully', activity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
