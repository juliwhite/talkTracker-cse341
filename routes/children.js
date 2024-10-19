// routes/children.js
const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController'); // Import the controller

// GET route to retrieve all children
router.get('/children', childController.getAllChildren);

//POST route to create a new child
router.post('/children', childController.createChild);

// Get a single child.
router.get('/children/:id', childController.getSingleChild)

// PUT update a single child
router.put('/children/:id', childController.updateChild)

// DELETE a child data by id
router.delete('/children/:id', childController.deleteChild)



/**
 * @swagger
 * /children:
 *  get:
 *      summary: Get all children
 *      description: Retrive a list of all the children in the database.
 *      responses:
 *          200:
 *            description: A list of children.
 *            content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Child'        
 */
router.get('/', childController.getAllChildren);

/**
 * @swagger
 * /children:
 *  post:
 *      summary: Add a new child
 *      description: Create a new child record in the database.
 *      requestBody:
 *          description: Child data that needs to be added.
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/Child'
 *      responses:
 *          201:
 *              description: Child created sucesfully.
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Child created succesfully."
 *                              data:
 *                                  $ref: '#/components/schemas/Child'
 *          400: 
 *              description: Invalid input.
 */
router.post('/', childController.createChild);

// Get one child
/**
 * @swagger
 * /children/{id}:
 *  get:
 *      summary: Get a child by ID
 *      description: Retrieve a specfic child record
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: The id of the child
 *      responses:
 *          200:
 *              description: Successfully retrieved the child data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Child'
 *          404:
 *              description: Child not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "child not found."
 */
router.get('/:id', childController.getSingleChild);


// Update one child
/**
 * @swagger
 * /children/{id}:
 *  put:
 *    summary: Update a child by ID
 *    description: Update a specfic child record
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the child to update
 *    requestBody:
 *      description: Udpated child data
 *      required: true
 *      content:
 *        application/json
 *          schema:
 *            $ref: '#/components/schemas/Child'
 *    responses:
 *      200:
 *        description: Successfully updated the child data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Child'
 *      404:
 *        description: Child no found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "child not found."
 *      500:
 *        description: Server error.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Error fetching child"
 *                error:
 *                  type: string
 *                  example: "Error message details"
 */
router.put('/:id', childController.updateChild);

// Swagger documentation for Deleting a child
/**
 * @swagger
 * /children/{id}:
 *   delete:
 *     summary: Delete a child by ID
 *     description: Remove a specific child record by providing their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the child to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the child.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Child deleted successfully"
 *       404:
 *         description: Child not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Child not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting child"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.delete('/:id', childController.deleteChild);

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