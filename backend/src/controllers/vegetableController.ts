import { Request, Response } from 'express';
import Vegetable from '../models/Vegetable';

// Get all vegetables
export const getAllVegetables = async (req: Request, res: Response) => {
  try {
    const vegetables = await Vegetable.find().sort({ name: 1 });
    res.json({ vegetables });
  } catch (error) {
    console.error('Get vegetables error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get vegetable by ID
export const getVegetableById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vegetable = await Vegetable.findById(id);
    
    if (!vegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }

    res.json({ vegetable });
  } catch (error) {
    console.error('Get vegetable error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add new vegetable (Admin only)
export const addVegetable = async (req: Request, res: Response) => {
  try {
    const { name, nameInTamil, category, description, unit } = req.body;

    if (!name || !nameInTamil || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingVegetable = await Vegetable.findOne({ name });
    if (existingVegetable) {
      return res.status(409).json({ message: 'Vegetable already exists' });
    }

    const vegetable = new Vegetable({
      name,
      nameInTamil,
      category,
      description,
      unit: unit || 'kg',
    });

    await vegetable.save();

    res.status(201).json({ message: 'Vegetable added successfully', vegetable });
  } catch (error) {
    console.error('Add vegetable error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Search vegetables
export const searchVegetables = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const vegetables = await Vegetable.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { nameInTamil: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({ vegetables });
  } catch (error) {
    console.error('Search vegetables error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
