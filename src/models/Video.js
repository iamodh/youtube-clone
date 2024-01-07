import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 100,
    trim: true,
  },
  hashtags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now,
  },
  meta: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
