const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleWare/error");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes 
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/orderRoutes'));
app.use('/api', require('./routes/cartRoutes'));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "backend/config/.env",
    });
  }

// Error handling
app.use(ErrorHandler);

// Server creation
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Uncaught exception handling
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
  server.close(() => {
    process.exit(1);
  });
});

// Unhandled promise rejection handling
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});