const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all problems (sorted newest first)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM problems ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET single problem by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM problems WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new problem
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO problems (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      status: 'open'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all students who have taken a problem
router.get('/:id/takers', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT student_name, taken_at FROM problem_takers WHERE problem_id = ? ORDER BY taken_at ASC',
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a student takes/joins a problem
router.post('/:id/take', async (req, res) => {
  const { studentName } = req.body;
  if (!studentName) {
    return res.status(400).json({ error: 'Student name required' });
  }
  try {
    // Check if problem exists
    const [problem] = await db.query(
      'SELECT id, status FROM problems WHERE id = ?',
      [req.params.id]
    );
    if (problem.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Insert into junction table (ignore duplicate)
    await db.query(
      'INSERT IGNORE INTO problem_takers (problem_id, student_name) VALUES (?, ?)',
      [req.params.id, studentName]
    );

    // If this is the first taker, update problem status to 'in-progress'
    const [takers] = await db.query(
      'SELECT COUNT(*) as count FROM problem_takers WHERE problem_id = ?',
      [req.params.id]
    );
    if (takers[0].count === 1 && problem[0].status === 'open') {
      await db.query(
        'UPDATE problems SET status = ? WHERE id = ?',
        ['in-progress', req.params.id]
      );
    }

    res.json({ message: 'Successfully joined the problem' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;