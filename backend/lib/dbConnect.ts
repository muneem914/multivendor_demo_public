import mongoose from 'mongoose';

let isConnected: boolean = false;

export const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.f9ow5g8.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

  if (!uri) {
    throw new Error("MongoDB connection URI is missing");
  }

  try {
    const db = await mongoose.connect(uri, {
      // Optional: fine-tune timeout & pool settings
      serverSelectionTimeoutMS: 5000, 
      maxPoolSize: 10
    });
    isConnected = !!db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
