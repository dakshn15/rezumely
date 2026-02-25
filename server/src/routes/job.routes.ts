
import express from 'express';
import { analyzeMatch, uploadResume } from '../controllers/job.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticateToken);

router.post('/analyze', analyzeMatch);
router.post('/upload', upload.single('resume'), uploadResume);

export default router;
