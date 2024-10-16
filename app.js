const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const childrenRoutes = require('./routes/children'); // Import your routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/children', childrenRoutes); // Use children routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));