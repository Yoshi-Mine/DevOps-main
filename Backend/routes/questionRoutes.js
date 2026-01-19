import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/**
 * CREATE (Single or Bulk)
 * POST /api/questions
 */
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // ✅ Bulk insert if array
    if (Array.isArray(data)) {
      const inserted = await Question.insertMany(data);
      return res
        .status(201)
        .json({ message: `${inserted.length} questions added`, data: inserted });
    }

    // ✅ Single insert
    const newQuestion = new Question(data);
    const saved = await newQuestion.save();
    res.status(201).json({ message: "Question added", data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * READ ALL
 * GET /api/questions
 */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ data: questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * READ ONE
 * GET /api/questions/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE
 * PUT /api/questions/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Question updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE
 * DELETE /api/questions/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Question deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;