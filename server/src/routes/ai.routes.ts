import express from 'express';
import { generateSummary, improveContent, atsCheck, generatePoints } from '../controllers/ai.controller';
import * as aiController from '../controllers/ai.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Protected routes - require login to use AI features
router.use(authenticateToken);

router.post('/summary', generateSummary);
router.post('/improve', improveContent);
router.post('/points', generatePoints);
router.post('/ats-check', atsCheck);

router.post('/cover-letter', authenticateToken, aiController.generateCoverLetter);

export default router;
