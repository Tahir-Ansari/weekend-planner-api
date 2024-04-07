const express = require('express');
const router = express.Router();
const Itinerary = require('../models/itineraries');
const Destination = require('../models/destinations');
const User = require('../models/users');



// Get all itineraries
router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get itinerary by ID
router.get('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new itinerary
router.post('/', async (req, res) => {
    try {
        const { name, description, destinations, start_date, end_date, participants } = req.body;
        
        // Validate required fields
        if (!name || !description || !destinations || !start_date || !end_date || !Array.isArray(participants)) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new itinerary
        const newItinerary = new Itinerary({
            name,
            description,
            destinations,
            start_date,
            end_date,
            participants
        });

        // Save the itinerary to the database
        await newItinerary.save();

        res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update itinerary by ID
router.put('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary updated successfully', itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete itinerary by ID
router.delete('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary deleted successfully', itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
