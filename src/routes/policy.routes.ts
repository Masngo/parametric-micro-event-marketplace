import { Router } from 'express';
import { purchasePolicy } from '../controllers/policy.controller';

const router = Router();
router.post('/purchase', purchasePolicy);

export default router;
