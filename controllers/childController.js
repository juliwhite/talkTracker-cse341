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
      res.status(400).json({ message: 'Error creating child', error: err });
    }
};

// Function to find one child by ID
const getSingleChild = async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id); // find child by id
    if (!child) {
      return res.status(404).json({ message: 'Child not found.'})
    }
    res.status(200).json(child); // respond with the child data
  } catch (err) {
    res.status(500).json({ message: 'Error fectching child', error: err });
  }
};

// Function to updata a child's details
const updateChild = async (req, res) => {
  try {
    const updatedChild = await Child.findByIdAndUpdate(req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        class: req.body.class,
        favoriteTreat: req.body.favoriteTreat,
        talksGiven: req.body.talksGiven
      },
      { new: true, runValidators: true } // Return the updated document, and run schema validators.
    );
    if (!updatedChild) {
      return res.status(404).json({ message: 'Child not found' }); 
    }
    res.status(200).json(updatedChild); // responds with the updated child data.
  } catch (err) {
    res.status(500).json({ message: 'Error updating child.', error: err});
  }
}

// function to delete a child by ID
const deleteChild = async (req, res) => {
  try {
    const deletedChild = await Child.findByIdAndDelete(req.params.id); //find child by ID and delete data.

    if (!deletedChild) {
      return res.status(404).json({ message: 'Child not found'});
    }

    res.status(200).json({ message: 'Child deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting child', error: err });
  }
};

module.exports = { getAllChildren, createChild, getSingleChild, updateChild, deleteChild };