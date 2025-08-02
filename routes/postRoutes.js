const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/posts', postController.createpost);
router.get('/posts', postController.getposts);
router.get('/posts/:id', postController.getpostsid);
router.put('/posts/:id', postController.updatepostid);
router.delete('/posts/:id', postController.deletepostid);

module.exports = router;