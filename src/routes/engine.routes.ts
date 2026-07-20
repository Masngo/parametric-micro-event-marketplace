import { Router } from 'express';
import { evaluateContract } from '../controllers/engine.controller';

const router = Router();
router.post('/evaluate/:id', evaluateContract);

export default router;
