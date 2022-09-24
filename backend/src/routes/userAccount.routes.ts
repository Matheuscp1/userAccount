import { AccountController } from '../controllers/UserAccountController';
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const controller = new AccountController();

router.post('/userAccount', controller.create);
router.post('/login',controller.login);
router.put('/update', auth, controller.updateUser);
router.post('/client', auth, controller.createClient);

/*
router.get('/account/:id', controller.getById) */
export { router as AccountRouter };
