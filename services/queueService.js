import { getNextServer, makeRequestToServer } from "./loadBalancerService.js";

let requestQueue = [];

export const addToQueue = (req, res) => {
  requestQueue.push({ req, res });
};

export const processQueue = async (config) => {
  if (requestQueue.length === 0) return;

  const { req, res } = requestQueue.shift();
  const server = getNextServer();

  if (!server) {
    res.status(500).json({
      success: false,
      error: "All Servers are dead !!!",
      message:
        "If you are a developer, ensure that you have provided the correct URLs in the load balancer configuration.",
    });
    return;
  }

  await makeRequestToServer(req, res, server);
};
