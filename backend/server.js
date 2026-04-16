require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const problemRoutes = require('./routes/problems');
const solutionRoutes = require('./routes/solutions');

app.use('/problems', problemRoutes);
app.use('/solutions', solutionRoutes);

// Health check
app.get('/', (req, res) => res.send('Backend is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
