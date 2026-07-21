import mongoose, { Schema, Document } from 'mongoose';

export interface IPrediction extends Document {
  vegetableId: string;
  location: string;
  predictedPrice: number;
  confidence: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new Schema<IPrediction>(
  {
    vegetableId: { type: String, required: true, ref: 'Vegetable' },
    location: { type: String, required: true },
    predictedPrice: { type: Number, required: true },
    confidence: { type: Number, min: 0, max: 100, default: 80 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

predictionSchema.index({ vegetableId: 1, date: -1 });
predictionSchema.index({ location: 1, date: -1 });

export default mongoose.model<IPrediction>('Prediction', predictionSchema);
