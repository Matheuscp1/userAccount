import { AccountController } from '../controllers/UserAccountController';
import { Router } from 'express';

const router = Router();
const controller = new AccountController();

router.post('/userAccount', controller.create)

export { router as AccountRouter };
