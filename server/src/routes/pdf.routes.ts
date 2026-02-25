import express from 'express';
import { downloadPDF } from '../controllers/pdf.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/:id/download', authenticateToken, downloadPDF);

export default router;
