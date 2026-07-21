import { Request, Response } from 'express';
import Price from '../models/Price';
import Prediction from '../models/Prediction';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';

// Get all vegetables with latest prices
export const getMarketPrices = async (req: Request, res: Response) => {
  try {
    const { vegetableId, location, limit = 50 } = req.query;

    let query: any = {};
    if (vegetableId) query.vegetableId = vegetableId;
    if (location) query.location = location;

    const prices = await Price.find(query)
      .sort({ date: -1 })
      .limit(Number(limit))
      .populate('vegetableId');

    res.json({ prices });
  } catch (error) {
    console.error('Get market prices error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get price trend for a vegetable
export const getPriceTrend = async (req: Request, res: Response) => {
  try {
    const { vegetableId, location, days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    const prices = await Price.find({
      vegetableId,
      location,
      date: { $gte: startDate },
    })
      .sort({ date: 1 })
      .populate('vegetableId');

    // Calculate statistics
    const priceValues = prices.map((p) => p.price);
    const stats = {
      min: Math.min(...priceValues) || 0,
      max: Math.max(...priceValues) || 0,
      avg: priceValues.length > 0 ? priceValues.reduce((a, b) => a + b) / priceValues.length : 0,
    };

    res.json({ prices, stats });
  } catch (error) {
    console.error('Get price trend error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add new price (Dealer only)
export const addPrice = async (req: AuthRequest, res: Response) => {
  try {
    const { vegetableId, price, location, quality, quantity } = req.body;

    if (!vegetableId || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPrice = new Price({
      vegetableId,
      dealerId: req.userId,
      price,
      location,
      quality: quality || 'medium',
      quantity: quantity || 0,
    });

    await newPrice.save();

    res.status(201).json({ message: 'Price added successfully', price: newPrice });
  } catch (error) {
    console.error('Add price error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get AI predictions
export const getPredictions = async (req: Request, res: Response) => {
  try {
    const { vegetableId, location } = req.query;

    let query: any = {};
    if (vegetableId) query.vegetableId = vegetableId;
    if (location) query.location = location;

    const predictions = await Prediction.find(query)
      .sort({ date: -1 })
      .limit(10)
      .populate('vegetableId');

    res.json({ predictions });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get price prediction from ML model
export const requestPricePrediction = async (req: Request, res: Response) => {
  try {
    const { vegetableId, location } = req.body;

    if (!vegetableId || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call ML model API
    const mlResponse = await axios.post(
      `${process.env.ML_MODEL_URL || 'http://localhost:5001'}/predict`,
      { vegetableId, location }
    );

    const { predictedPrice, confidence } = mlResponse.data;

    // Save prediction to database
    const prediction = new Prediction({
      vegetableId,
      location,
      predictedPrice,
      confidence,
    });

    await prediction.save();

    res.json({
      message: 'Prediction generated successfully',
      prediction,
    });
  } catch (error) {
    console.error('Request prediction error:', error);
    res.status(500).json({ message: 'Failed to get prediction' });
  }
};
