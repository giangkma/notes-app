import express from 'express';
import controller from '../controllers/auth.controller';
import { isAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import validation from '../validations/auth.validation';

const router = express.Router();

router.post('/login', validate(validation.login), controller.login);

router.post('/register', validate(validation.register), controller.register);

router.get('/profile', isAuth, controller.getProfile);
router.put(
    '/profile',
    isAuth,
    validate(validation.updateProfile),
    controller.updateProfile,
);

export default router;
