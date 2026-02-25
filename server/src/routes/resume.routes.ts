import express from 'express';
import { createResume, getResumes, getResumeById, updateResume, deleteResume, togglePublic } from '../controllers/resume.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticateToken); // Apply auth middleware to all resume routes

router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.patch('/:id/public', togglePublic);

export default router;
