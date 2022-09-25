import { AccountController } from '../controllers/UserAccountController';
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const controller = new AccountController();

router.post('/userAccount', controller.create);
router.post('/login', controller.login);
router.put('/userAccount', auth, controller.updateUser);
router.post('/client', auth, controller.createClient);
router.get('/client', auth, controller.getClients);
router.post('/called', auth, controller.createCalled);
router.get('/called', auth, controller.getCalled);
router.get('/called/:id', auth, controller.getCalledById);
router.put('/called', auth, controller.updateCalled);

export { router as AccountRouter };
