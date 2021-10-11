const express = require('express');

const router = express.Router();
const { protect } = require('../middlewares/auth');
const postController = require('../controllers/postController');

router.use(protect);
router.route('/').get(postController.getPosts).post(postController.createPost);

router
  .route('/:id')
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
