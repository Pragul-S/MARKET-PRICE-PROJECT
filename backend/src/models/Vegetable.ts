import mongoose, { Schema, Document } from 'mongoose';

export interface IVegetable extends Document {
  name: string;
  nameInTamil: string;
  category: string;
  description: string;
  unit: string; // kg, piece, etc.
  createdAt: Date;
  updatedAt: Date;
}

const vegetableSchema = new Schema<IVegetable>(
  {
    name: { type: String, required: true, unique: true },
    nameInTamil: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    unit: { type: String, default: 'kg' },
  },
  { timestamps: true }
);

export default mongoose.model<IVegetable>('Vegetable', vegetableSchema);
