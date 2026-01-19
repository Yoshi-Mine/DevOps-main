import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  options: { 
    type: [String], 
    required: true 
  },
  correctAnswer: {  // ← Change from 'correct' to 'correctAnswer'
    type: String, 
    required: true 
  },
  explanation: { 
    type: String 
  }
});

export default mongoose.model("Question", questionSchema);