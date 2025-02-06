const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
router.post("/ocr", async (req, res) => {
  // Create a new FormData object
  const form = new FormData();

  // Append the files to the form
  form.append(
    "uploaded_files",
    fs.createReadStream(
      "C:/Users/DELL/Downloads/Image_to_url_convert/stock-photo-sample-of-modern-driver-s-license-front-view-1979008355.jpg"
    )
  );
  form.append(
    "uploaded_files",
    fs.createReadStream("C:/Users/DELL/Downloads/Image_to_url_convert/dl2.jpg")
  );

  // Append the user prompt as JSON
  const userPrompt = {
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
  };
  form.append("user_prompt", JSON.stringify(userPrompt));

  // Define the API endpoint and Authorization token
  const url =
    "https://aura-ai.aurainsure.tech/v1/sme/?document_name=emirates-id";
  const token1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjp7ImNsaWVudF9pZCI6MTIzNCwicHJvZHVjdF9pZHMiOls0LDUsNl0sInByb2R1Y3RfbmFtZXMiOlsic21lIiwiaGVhbHRoIiwiYXV0byJdLCJleHAiOjE3Mzg4MTcyMzEuMTU5NTIzfX0.b41lIDoIFDJCr8CX9euKkPZH7yczHFx4lZ2GfpXS_2U";

  // Perform the POST request using axios
  axios
    .post(url, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: "Bearer " + token1,
        Accept: "application/json",
      },
    })
    .then((response) => {
      // Send back the response data from the server
      res.json(response.data);
    })
    .catch((error) => {
      // Handle any errors and send the error back to the client
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

module.exports = router;
