const axios = require("axios");
const qs = require("qs"); // Import qs to help with url-encoded format

async function getToken() {
  const url = "https://aura-ai.aurainsure.tech/v1/auth";

  // Prepare the body as url-encoded data
  const data = qs.stringify({
    client_id: "1234",
    client_secret: "aura_ai_master",
  });

  // Set up the headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(url, data, { headers });

    // Extract the token (check the response structure for token location)
    const token = response.data.access_token; // Adjust based on actual response
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

getToken();
