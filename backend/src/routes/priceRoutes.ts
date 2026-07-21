import express, { Router } from 'express';
import {
  getMarketPrices,
  getPriceTrend,
  addPrice,
  getPredictions,
  requestPricePrediction,
} from '../controllers/priceController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router: Router = express.Router();

router.get('/market', getMarketPrices);
router.get('/trend', getPriceTrend);
router.get('/predictions', getPredictions);

router.post('/add', authMiddleware, roleMiddleware(['dealer']), addPrice);
router.post('/predict', authMiddleware, requestPricePrediction);

export default router;
