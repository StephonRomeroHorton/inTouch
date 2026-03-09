require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const quoteRoutes = require('./routes/quotes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Your API routes
app.use('/quotes', quoteRoutes);

// Serve static files *only* if build folder exists
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

// ✅ Corrected wildcard route
app.use((req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err.message));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);


