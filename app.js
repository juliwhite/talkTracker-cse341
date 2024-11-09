const express = require('express');
require('dotenv').config();
const session = require('express-session'); // Import express-session
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const connectDB = require('./config/database'); // Import the database connection
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json'); // Generated Swagger file
const childrenRoutes = require('./routes/children'); // Import your routes
const authRoutes = require('./routes/auth');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const passport = require('passport'); // Import passport
require('./config/passport')(passport)  // Passport config file
const dashboardRoutes = require('./routes/dashboard');


const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: ['https://talktracker.onrender.com'], // Add your trusted origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// Middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse incoming JSON

// Session middleware (required for persistent login sessions)
app.use(session({
  secret: 'medody' || 'secret', // Use an environment variable for security
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // For security, ensure it's not accessible via JavaScript
    maxAge: 3600000 // Cookie expiry time (e.g., 1 hour)
   } // Secure cookies in production
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
  swaggerOptions: {
    oauth2RedirectUrl: process.env.GOOGLE_CALLBACK_URL || 'https://talktracker.onrender.com/api-docs/oauth2-redirect.html',
    //oauth2RedirectUrl: "https://talktracker.onrender.com/api-docs/oauth2-redirect.html",
    //initOAuth: {
    oauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scopes: ["openid", "profile", "email"],
      //useBasicAuthenticationWithAccessCodeGrant: true
    }
  }
}));

// ROUTES
app.use('/', childrenRoutes); // Use children routes

// Use the authentication routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.render("home")
})

app.use('/dashboard', dashboardRoutes);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//  Initialize Apollo Server with schema and resolvers
//const server = new ApolloServer({ typeDefs, resolvers });
//server.start().then(res => {
  //server.applyMiddleware({ app });
  //app.listen( PORT, () =>
    //console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  //);
//});

