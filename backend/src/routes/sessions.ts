import { Router } from 'express';
import { createSession, getSessions } from '../controllers/sessions';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, createSession);
router.get('/student/:studentId', auth, getSessions);

export default router;
