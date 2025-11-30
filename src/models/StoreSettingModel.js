const { model, Schema } = require('mongoose') ;


const storeSettingsSchema = new Schema(
  {
    // Basic Store Information
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    storeEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    storePhone: {
      type: String,
      trim: true,
    },
    storeDescription: {
      type: String,
      trim: true,
    },

    // Logo & Branding
    logo: {
      url: String,
      publicId: String, // For Cloudinary
    },
    favicon: {
      url: String,
      publicId: String,
    },
    brandColor: {
      type: String,
      default: "#000000",
    },

    // Metadata & SEO
    metadata: {
      title: String,
      description: String,
      keywords: [String],
    },

    // Social Media Links
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      youtube: String,
      tiktok: String,
      pinterest: String,
    },

    // Store Address
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },

    // Store Policies
    policies: {
      privacyPolicy: String,
      termsConditions: String,
      returnPolicy: String,
      shippingPolicy: String,
    },

    // Payment Settings
    currency: {
      type: String,
      default: "BDT",
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

const StoreSetting = model('StoreSetting', storeSettingsSchema);

module.exports = StoreSetting;