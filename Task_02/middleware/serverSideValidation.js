const { check, validationResult } = require('express-validator');

const serverSideValidate = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is not valid'),
  check('age').isInt({ min: 18 }).withMessage('Age must be a number greater than 18'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = serverSideValidate;
