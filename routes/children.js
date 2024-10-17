// routes/children.js
const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController'); // Import the controller

// GET route to retrieve all children
router.get('/', childController.getAllChildren);

//POST route to create a new child
router.post('/', childController.createChild);

module.exports = router;














/*const Child = require('../models/child');

// GET all children
//router.get('/', async (req, res) => {
    console.log('GET /api/children endpoint hit');
    try {
        const children = await Child.find();
        console.log('Retrieved children:', children); // For debugging
        res.json(children);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new child
router.post('/', async (req, res) => {
    const child = new Child({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        class: req.body.class,
        favoriteTreat: req.body.favoriteTreat,
        talksGiven: req.body.talksGiven,
    });

    try {
        const newChild = await child.save();
        res.status(201).json(newChild);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;*/