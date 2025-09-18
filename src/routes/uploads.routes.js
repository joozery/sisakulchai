import { Router } from 'express';
import { presignUpload } from '../controllers/uploads.controller.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = Router();
router.use(requireAdmin);
router.post('/presign', presignUpload);

export default router;


