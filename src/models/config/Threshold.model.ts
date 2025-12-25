import { model, Schema, Document } from 'mongoose';

// Interface for the RiskThreshold document
export interface IRiskThreshold extends Document {
  factor: string;
  operator: 'LT' | 'GT' | 'EQ';
  value: number;
  description?: string;
}

// Mongoose Schema for RiskThreshold
const RiskThresholdSchema = new Schema<IRiskThreshold>(
  {
    factor: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    operator: {
      type: String,
      required: true,
      enum: ['LT', 'GT', 'EQ'],
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v version key
  }
);

// Mongoose Model for RiskThreshold
export const RiskThresholdModel = model<IRiskThreshold>(
  'RiskThreshold',
  RiskThresholdSchema
);
