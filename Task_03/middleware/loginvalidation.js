const { check, validationResult  } = require('express-validator');

const loginServerSideValidation = [
  check('email').isEmail().withMessage('Email is not valid'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  (req, res, next) => {
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = loginServerSideValidation ;
