import { getNextServer, makeRequestToServer } from "./loadBalancerService.js"; // Ensure the correct import path

let requestQueue = [];

export const addToQueue = (req, res) => {
  requestQueue.push({ req, res });
};

export const processQueue = async (config) => {
  if (requestQueue.length === 0) return;

  const { req, res } = requestQueue.shift();

  // Get server based on dynamic routing
  const server = getNextServer(req);

  if (!server) {
    res.status(500).json({
      success: false,
      error: "No healthy servers available",
      message:
        "Ensure that you have provided the correct URLs in the load balancer configuration.",
    });
    return;
  }

  await makeRequestToServer(req, res, server);
};
