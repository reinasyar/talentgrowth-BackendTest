const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/auth/register', authController.createuser);
router.post('/auth/login', authController.login);
router.get('/profile', verifyToken, authController.profile);

module.exports = router;
