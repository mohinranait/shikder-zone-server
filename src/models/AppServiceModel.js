import mongoose, { Schema } from "mongoose";



const appIntegrationSchema = new Schema(
  {
    email: {
      provider: { type: String },
      apiKey: { type: String },
      senderEmail: { type: String },
      senderName: { type: String },
      isVerified: { type: Boolean, default: false },
    },

    cloudinary: {
      cloudName: { type: String },
      apiKey: { type: String },
      apiSecret: { type: String },
    },

    facebookPixel: {
      pixelId: { type: String },
      accessToken: { type: String },
      enableTracking: { type: Boolean, default: true },
    },

    webhook: [
      {
        eventType: { type: String },
        endpointUrl: { type: String },
        isActive: { type: Boolean, default: true },
      },
    ],

  },
  { timestamps: true }
);

export const AppIntegration = mongoose.model(
  "AppIntegration",
  appIntegrationSchema
);
