import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI environment variable is missing!");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(uri);
    console.log("⚡ Connected safely to MongoDB Atlas database stack.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};
