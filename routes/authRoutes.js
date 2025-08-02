const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateerror');


router.post('/auth/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').isLength({min: 1}).withMessage('Name is Required'),
    validate,
], authController.createuser);
router.post('/auth/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate,
], authController.login);
router.get('/profile', verifyToken, authController.profile);

module.exports = router;
