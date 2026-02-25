import express from 'express';
import { createVersion, getVersions, restoreVersion, deleteVersion } from '../controllers/version.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are scoped under /resumes/:resumeId/versions in app.ts, 
// OR we can define them here as /:resumeId/versions
// Standard practice: /api/versions? No, it belongs to a resume.
// Let's mount this router at /api/resumes in app.ts and use subroutes, 
// BUT app.ts currently mounts resumeRoutes at /api/resumes. 
// We should add these to resume.routes.ts OR mount at /api/versions for simplicity with userId checks.
// Let's try separate router mounted at /api/resumes/:resumeId/versions for clarity

// Actually, let's keep it simple and mount at /api/versions and pass resumeId in body or param?
// Better REST: POST /api/resumes/:resumeId/versions.
// I will create this file, but likely need to merge into resume.routes.ts OR generic router.
// Let's stick to a merged approach or just a new path prefix. 
// I'll register this router at /api/versions and handle passing resumeId.

// Routes:
// POST /:resumeId - Create version for resume
// GET /:resumeId - Get versions for resume
// POST /:resumeId/restore/:versionId - Restore version
// DELETE /:resumeId/:versionId - Delete version

router.post('/:resumeId', authenticateToken, createVersion);
router.get('/:resumeId', authenticateToken, getVersions);
router.post('/:resumeId/restore/:versionId', authenticateToken, restoreVersion);
router.delete('/:resumeId/:versionId', authenticateToken, deleteVersion);

export default router;
