import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
};
