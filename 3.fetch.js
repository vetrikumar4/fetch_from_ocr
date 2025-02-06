const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const token = require("./get_token");
console.log(token);

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
const url = "https://aura-ai.aurainsure.tech/v1/sme/?document_name=emirates-id";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjp7ImNsaWVudF9pZCI6MTIzNCwicHJvZHVjdF9pZHMiOls0LDUsNl0sInByb2R1Y3RfbmFtZXMiOlsic21lIiwiaGVhbHRoIiwiYXV0byJdLCJleHAiOjE3Mzg3Nzg3NTcuMzU0MTkzfX0.rsQFbFBFWAcDbz5HlYyLjrQfdZ3B8exUTiDNrZggJXg";

// Perform the POST request using axios
async function callfunc() {
  const response = await axios.post(url, form, {
    headers: {
      //   ...form.getHeaders(),
      Authorization: "Bearer " + token.trim(),
      Accept: "application/json",
    },
  });
  console.log(response);
}
callfunc();
// axios
//   .post(url, form, {
//     headers: {
//       ...form.getHeaders(),
//       Authorization: `Bearer ` + token,
//       Accept: "application/json",
//     },
//   })
//   .then((response) => {
//     console.log(response.data); // Log the data received from the server
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
