const { signup,login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const express = require('express');

const router = express.Router();

// Login route
router.post('/login', loginValidation, login);
// Signup route with middleware
router.post('/signup', signupValidation, signup);

module.exports = router;
