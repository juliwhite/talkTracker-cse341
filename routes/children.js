// routes/children.js
const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController'); // Import the controller
const { validateChildCreation, validateChildUpdate, validateId } = require('../validator');



// GET route to retrieve all children
router.get('/children', childController.getAllChildren);

//POST route to create a new child
router.post('/children', validateChildCreation, childController.createChild);

// Get a single child.
router.get('/children/:id', validateId, childController.getSingleChild)

// PUT update a single child
router.put('/children/:id', [validateId, validateChildUpdate], childController.updateChild)

// DELETE a child data by id
router.delete('/children/:id', validateId,childController.deleteChild)


module.exports = router;














