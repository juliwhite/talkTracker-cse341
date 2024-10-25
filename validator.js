const { body, param, validationResult } = require('express-validator');

// Validate child creation
const validateChildCreation = [
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  body('birthday').isString().withMessage('Birthday must be a valid date'),
  body('class').isString().notEmpty().withMessage('Class is required'),
  body('favoriteTreat').isString().notEmpty().withMessage('Favorite treat is required'),
  body('talksGiven').isInt({ min: 0 }).withMessage('Talks given must be a non-negative integer')
    .not().isString().withMessage('Talks given must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validate child update (allow optional fields)
const validateChildUpdate = [
    body('firstName').isString().optional(),
    body('lastName').isString().optional(),
    body('birthday').isString().optional(),
    body('class').isString().optional(),
    body('favoriteTreat').isString().optional(),
    body('talksGiven').isNumeric().optional(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

// Validate MongoDB ObjectId in URL params
const validateId = [
  param('id').isMongoId().withMessage('Invalid child ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateChildCreation,
  validateChildUpdate,
  validateId
};