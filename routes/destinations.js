const express = require('express');
const router = express.Router();
const Destination = require('../models/destinations');

// Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new destination
router.post('/', async (req, res) => {
    try {
        // Extract destination data from the request body
        const { name, location, description, activities, reviews, photos, amenities } = req.body;

        // Validate required fields
        if (!name || !location || !description || !activities) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new destination
        const newDestination = new Destination({
            name,
            location,
            description,
            activities,
            reviews: reviews || [], // If reviews not provided, initialize as an empty array
            photos: photos || [], // If photos not provided, initialize as an empty array
            amenities: amenities || [] // If amenities not provided, initialize as an empty array
        });

        // Save the destination to the database
        await newDestination.save();

        res.status(201).json({ message: 'Destination added successfully', destination: newDestination });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
