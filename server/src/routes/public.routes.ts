import express from 'express';
import { getPublicResume } from '../controllers/resume.controller';

const router = express.Router();

router.get('/:idOrSlug', getPublicResume);

export default router;
