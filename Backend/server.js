import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'quiz-backend',
    timestamp: new Date().toISOString()
  });
});

// Simple test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Quiz Backend API is working!" });
});

// Import routes with error handling
let questionRoutes;
try {
  questionRoutes = (await import("./routes/questionRoutes.js")).default;
  app.use("/api/questions", questionRoutes);
  console.log("✅ Question routes loaded");
} catch (error) {
  console.log("⚠️  Question routes not loaded:", error.message);
}

// MongoDB connection with timeout
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/quizapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("⚠️  MongoDB connection failed:", error.message);
    console.log("📝 Continuing without database...");
  }
};

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});