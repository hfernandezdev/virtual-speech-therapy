import { Router } from 'express';
import { getStudents, getStudentProgress } from '../controllers/students';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, getStudents);
router.get('/:studentId/progress', auth, getStudentProgress);

export default router;
