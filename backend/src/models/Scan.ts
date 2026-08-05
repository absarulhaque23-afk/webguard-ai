import mongoose from 'mongoose';

const webpageAnalysisSchema = new mongoose.Schema({
  statusCode: Number,
  redirectCount: Number,
  finalUrl: String,
  contentType: String,
  htmlSize: Number,
  numForms: Number,
  numIframes: Number,
  numExternalScripts: Number,
  hasPasswordInput: Boolean,
}, { _id: false });

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    normalizedUrl: {
      type: String,
      required: true,
    },
    prediction: {
      type: String,
      enum: ['BENIGN', 'SUSPICIOUS', 'MALICIOUS'],
      required: true,
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      required: true,
    },
    features: {
      type: Map,
      of: Number,
    },
    reasons: {
      type: [String],
    },
    featureImportance: {
      type: Map,
      of: Number,
    },
    modelVersion: {
      type: String,
    },
    scanDuration: {
      type: Number,
    },
    webpageAnalysis: webpageAnalysisSchema,
  },
  {
    timestamps: true,
  }
);

scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ prediction: 1 });
scanSchema.index({ riskLevel: 1 });

export const Scan = mongoose.model('Scan', scanSchema);
