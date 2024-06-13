import express from "express";
import { handleRequest } from "./controllers/requestController.js";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import { scheduleHealthCheck } from "./services/healthCheckService.js";
import { loadConfig } from "./utils/config.js";

const app = express();
const PORT = 4000;

// Load configuration
const config = loadConfig();

// Middleware for logging
app.use(loggerMiddleware);

// Handle all incoming requests
app.all("*", (req, res) => handleRequest(req, res, config));

// Function to start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Load Balancer is running on port: ${PORT}`);
    scheduleHealthCheck(config);
  });
};

export { startServer };
