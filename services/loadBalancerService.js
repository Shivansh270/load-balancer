import chalk from "chalk";
import axios from "axios"; // Ensure axios is imported here

let healthyServers = [];

export const updateServerHealth = (server, isHealthy) => {
  if (isHealthy && !healthyServers.includes(server)) {
    healthyServers.push(server);
    console.log(chalk.green(`Server ${server} added to healthy servers`));
  } else if (!isHealthy) {
    healthyServers = healthyServers.filter((s) => s !== server);
    console.log(chalk.yellow(`Server ${server} removed from healthy servers`));
  }
};

export const getNextServer = (req) => {
  if (healthyServers.length === 0) {
    console.log(chalk.red("No healthy servers available"));
    return null;
  }
  const server =
    healthyServers[Math.floor(Math.random() * healthyServers.length)];
  console.log(chalk.blue(`Selected server: ${server}`));
  return server;
};

export const makeRequestToServer = async (req, res, server) => {
  try {
    const { data } = await axios({
      method: req.method,
      url: `${server}${req.originalUrl}`,
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
