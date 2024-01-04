
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(routes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});


// Protected route using JWT authentication
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.send(`Welcome to the dashboard, ${req.body.username}!`);
});

// Middleware to check if user is authenticated using JWT
function authenticateJWT(req, res, next) {
  const token = req.header('x-authenticated-token');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});