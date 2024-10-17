const Child = require('../models/child'); // Import the child model

// Function to get all talks
const getAllChildren = async (req, res) => {
  try {
    const children = await Child.find(); // Retrieve all children from the DB
    res.status(200).json(children); // Respond with the list of children
  } catch (err) {
    res.status(500).json({ message: 'Error fetching talks', error: err });
  }
};

// Function to create a new talk
const createChild = async (req, res) => {
    const child = new Child({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        class: req.body.class,
        favoriteTreat: req.body.favoriteTreat,
        talksGiven: req.body.talksGiven,
    });
  
    try {
      const newChild = await child.save(); // Save the new child to the database
      res.status(201).json(newChild); // Respond with the created child
    } catch (err) {
      res.status(500).json({ message: 'Error creating child', error: err });
    }
};

module.exports = { getAllChildren, createChild };