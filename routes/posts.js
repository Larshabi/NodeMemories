import express from 'express';
import PostController from '../controller/posts.controller.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', PostController.getPosts);
router.post('/', auth, PostController.createPost);
router.patch('/:id', auth, PostController.updatePost);
router.delete('/:id', auth, PostController.deletePost);
router.patch('/:id/likePost', auth, PostController.likePost)

export default router;