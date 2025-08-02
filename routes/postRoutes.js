const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/posts', verifyToken, postController.createpost);
router.get('/posts', postController.getposts);
router.get('/posts/:id', postController.getpostsid);
router.put('/posts/:id', verifyToken, postController.updatepostid);
router.delete('/posts/:id', verifyToken, postController.deletepostid);

module.exports = router;