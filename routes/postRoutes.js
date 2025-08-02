const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middleware/validateerror');

const postValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),
];

router.post('/posts', verifyToken, postValidation, validate, postController.createpost);
router.get('/posts', postController.getposts);
router.get('/posts/:id', postController.getpostsid);
router.put('/posts/:id', verifyToken, postValidation, validate, postController.updatepostid);
router.delete('/posts/:id', verifyToken, postController.deletepostid);

module.exports = router;