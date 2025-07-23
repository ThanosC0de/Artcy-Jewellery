import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    asset_id: {
      type: String,
      require: true,
      trim: true,
    },
    public_id: {
      type: String,
      require: true,
      trim: true,
    },
    path: {
      type: String,
      require: true,
      trim: true,
    },
    thumbnail_url: {
      type: String,
      require: true,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    deletedAt: {
      type: Data,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

const MediaModel =  mongoose.models.OTP || mongoose.model("Media", mediaSchema, "medias");

export default MediaModel;
