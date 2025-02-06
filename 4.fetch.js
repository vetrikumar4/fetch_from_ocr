const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function authenticateAndUpload() {
  try {
    const body = new URLSearchParams();
    body.append("client_id", "1234");
    body.append("client_secret", "aura_ai_master");

    // First request - Authentication to get the Bearer token

    const authResponse = await axios.post(
      "https://aura-ai.aurainsure.tech/v1/auth",
      null,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      }
    );

    if (authResponse.status !== 200) {
      throw new Error(`Authentication failed: ${authResponse.statusText}`);
    }

    const accessToken = authResponse.data.access_token; // Assuming the access token is in the response

    // Prepare file uploads (ensure correct file paths)
    const filePath1 =
      "C:/Users/DELL/Downloads/Image_to_url_convert/stock-photo-sample-of-modern-driver-s-license-front-view-1979008355.jpg";
    const filePath2 = "C:/Users/DELL/Downloads/Image_to_url_convert/dl2.jpg";

    // Create a FormData instance and append files and other data
    const formData = new FormData();
    formData.append("uploaded_files", fs.createReadStream(filePath1));
    formData.append("uploaded_files", fs.createReadStream(filePath2));
    formData.append(
      "user_prompt",
      JSON.stringify({
        "ID Number": "int",
        Name: "str",
        "Date of Birth": "datetime",
        Nationality: "str",
        "Issuing Date": "datetime",
        "Expiry Date": "datetime",
        Sex: "str",
        "Card Number": "str",
        Occupation: "str",
        "Employer or Sponsor": "str",
        "Issuing Place": "str",
      })
    );

    // Second request - Upload files with the Bearer token
    const uploadResponse = await axios.post(
      "https://aura-ai.aurainsure.tech/v1/sme/?document_name=emirates-id",
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(), // FormData headers
        },
      }
    );

    if (uploadResponse.status !== 200) {
      throw new Error(`File upload failed: ${uploadResponse.statusText}`);
    }

    console.log("File upload successful:", uploadResponse.data);
  } catch (error) {
    if (error.response) {
      // Log the error response with the full error details
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
    } else {
      console.error("Error:", error.message);
    }
  }
}

authenticateAndUpload();
