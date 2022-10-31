import express from 'express';
import UserController from 'users.controller.js';
router = express.Router();

router.post('/signup', UserController.signup)

router.post('/signin', UserController.signin)

export default router;