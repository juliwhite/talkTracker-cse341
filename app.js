const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); // Generated Swagger file
const childrenRoutes = require('./routes/children'); // Import your routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON

app.use(cors({
    origin: 'http://localhost:8080', // Replace with your frontend URL
 }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/', childrenRoutes); // Use children routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));