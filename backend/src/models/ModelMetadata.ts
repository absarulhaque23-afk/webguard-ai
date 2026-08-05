import mongoose from 'mongoose';

const modelMetadataSchema = new mongoose.Schema({
  modelName: String,
  version: String,
  algorithm: String,
  accuracy: Number,
  precision: Number,
  recall: Number,
  f1Score: Number,
  rocAuc: Number,
  trainingDataset: String,
  trainedAt: Date,
  features: [String],
  hyperparameters: mongoose.Schema.Types.Mixed,
  confusionMatrix: [[Number]],
  classLabels: [String],
});

export const ModelMetadata = mongoose.model('ModelMetadata', modelMetadataSchema);
