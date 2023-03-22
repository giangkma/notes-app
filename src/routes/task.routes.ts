import { isAuth } from './../middlewares/auth';
import express from 'express';
import controller from '../controllers/task.controller';
import { validate } from '../middlewares/validate';
import validation from '../validations/task.validation';

const router = express.Router();

router.post('', isAuth, validate(validation.create), controller.create);
router.get('', isAuth, controller.getAll);

export default router;
