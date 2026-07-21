import mongoose, { Schema, Document } from 'mongoose';

export interface IPrice extends Document {
  vegetableId: string;
  dealerId: string;
  price: number;
  location: string;
  quality: 'high' | 'medium' | 'low';
  quantity: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const priceSchema = new Schema<IPrice>(
  {
    vegetableId: { type: String, required: true, ref: 'Vegetable' },
    dealerId: { type: String, required: true, ref: 'User' },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    quality: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    quantity: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

priceSchema.index({ vegetableId: 1, date: -1 });
priceSchema.index({ dealerId: 1, date: -1 });
priceSchema.index({ location: 1 });

export default mongoose.model<IPrice>('Price', priceSchema);
