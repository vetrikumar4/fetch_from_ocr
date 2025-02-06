let token = "";
let data1 = "";
async function getToken() {
  const url = "https://aura-ai.aurainsure.tech/v1/auth";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Prepare the data in URL-encoded format
  const body = new URLSearchParams();
  body.append("client_id", "1234");
  body.append("client_secret", "aura_ai_master");

  try {
    // Perform the POST request using fetch
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    // Parse the JSON response
    const data = await response.json();

    // Extract the token from the response (assuming it's in a property called 'token')
    token = data["access_token"];
    let data1 = data;
    let result = token.toString();
    // let result1 = '"' + token + '"';
    token = result;
    // console.log(token);
    // Change 'token' to whatever the actual property name is in the response
    return token;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function and assign the result to 'token'
getToken().then((token) => {
  // You can use the 'token' here
});

module.exports = token;
