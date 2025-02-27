import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//creatomt tje actual table(collection)
//to store data
export default mongoose.model("Blog", blogSchema);
