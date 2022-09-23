import { AccountController } from '../controllers/UserAccountController';
import { Router } from 'express';

const router = Router();
const controller = new AccountController();

router.post('/userAccount', controller.create);
router.post('/login', controller.login);
/*
router.get('/account/:id', controller.getById) */
export { router as AccountRouter };