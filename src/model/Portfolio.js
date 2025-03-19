const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // Array of URLs or paths to uploaded images
      },
    ],
    technologies: [
      {
        type: String,
      },
    ],
    links: {
      live: { type: String }, // URL to the live project
      github: { type: String }, // URL to the GitHub repo
    },
    date: {
      type: Date,
      default: Date.now,
    },
    client: {
      name: { type: String },
      testimonial: { type: String },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
