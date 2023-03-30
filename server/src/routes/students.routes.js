import {Router} from 'express';
import {createStudent, getStudents, getStudentsById, updateStudent, deleteStudent} from '../controllers/students.controller.js';
import { verifyToken } from '../middleware/token.js';

const router = Router();


router.post('/students',verifyToken, createStudent);
router.get('/students',verifyToken, getStudents);
router.get('/students/:id',verifyToken, getStudentsById);
router.put('/students/:id',verifyToken, updateStudent);
router.delete('/students/:id',verifyToken, deleteStudent);

export default router;