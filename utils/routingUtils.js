// routingUtils.js

// Function to extract the base URL from a full URL
const extractBaseUrl = (fullUrl) => {
  const urlParts = fullUrl.split("/");
  return urlParts[0] + "//" + urlParts[2];
};

// Function to check if a URL is valid
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Function to parse and extract query parameters from a URL
const extractQueryParams = (url) => {
  const urlObj = new URL(url);
  const params = {};
  for (const [key, value] of urlObj.searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

// Export the utility functions for use in other modules
module.exports = {
  extractBaseUrl,
  isValidUrl,
  extractQueryParams,
};
