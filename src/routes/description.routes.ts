import express from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import authValidation from '../validations/auth.validation';

const router = express.Router();

router.post('', validate(authValidation.login), authController.login);

export default router;
