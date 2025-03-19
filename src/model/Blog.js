import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String, // Added description field
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publicationDate: {
      // Kept original name
      type: Date,
      default: Date.now,
    },
    categories: [
      {
        type: String, // Kept categories as an array
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    featuredImage: {
      type: String, // Path to the uploaded image
    },
    mdFile: { type: String, required: true }, // Path to original MD file
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    readTime: {
      // Added readTime to store estimated reading time
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Blog", blogSchema);
