import express, { Router } from 'express';
import {
  getAllVegetables,
  getVegetableById,
  addVegetable,
  searchVegetables,
} from '../controllers/vegetableController';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

router.get('/', getAllVegetables);
router.get('/search', searchVegetables);
router.get('/:id', getVegetableById);
router.post('/add', authMiddleware, addVegetable);

export default router;
