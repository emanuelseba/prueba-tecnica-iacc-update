import {Router} from 'express';
import {createCareer, getCareers, getStudentsByCareer} from '../controllers/careers.controller.js';
import { verifyToken } from '../middleware/token.js'

const router = Router();


router.get('/careers',verifyToken, getCareers);
router.get('/careers/:id/students',verifyToken, getStudentsByCareer);
router.post('/careers',verifyToken, createCareer);

export default router;