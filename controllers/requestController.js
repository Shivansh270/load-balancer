import { addToQueue, processQueue } from "../services/queueService.js";


export const handleRequest = async (req, res, config) => {
  try {
    console.log("Handling request");
    console.log(
      `Received request from ${req.ip}\nHost: ${
        req.hostname
      }\nUser-Agent: ${req.get("User-Agent")}`
    );

    addToQueue(req, res);
    processQueue(config);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
