const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = './uploads/solutions';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for solution file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// GET all solutions for a specific problem
router.get('/problem/:problemId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM solutions WHERE problem_id = ? ORDER BY created_at DESC',
      [req.params.problemId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new solution (text, GitHub link, or file)
router.post('/problem/:problemId', upload.single('file'), async (req, res) => {
  const problemId = req.params.problemId;
  const { text, github_link } = req.body;
  let file_path = null;
  let solution_type = 'text';

  try {
    // Check if problem exists
    const [problem] = await db.query('SELECT id FROM problems WHERE id = ?', [problemId]);
    if (problem.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    if (req.file) {
      solution_type = 'file';
      file_path = req.file.path;
    } else if (github_link && github_link.trim() !== '') {
      solution_type = 'github';
    } else if (text && text.trim() !== '') {
      solution_type = 'text';
    } else {
      return res.status(400).json({ error: 'Must provide text, GitHub link, or file' });
    }

    const [result] = await db.query(
      'INSERT INTO solutions (problem_id, text, github_link, file_path, solution_type) VALUES (?, ?, ?, ?, ?)',
      [problemId, text || null, github_link || null, file_path, solution_type]
    );

    res.status(201).json({
      id: result.insertId,
      problem_id: problemId,
      text,
      github_link,
      file_path,
      solution_type
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DOWNLOAD a solution file
router.get('/download/:solutionId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT file_path FROM solutions WHERE id = ? AND solution_type = "file"',
      [req.params.solutionId]
    );
    if (rows.length === 0 || !rows[0].file_path) {
      return res.status(404).json({ error: 'File not found' });
    }
    const filePath = rows[0].file_path;
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;