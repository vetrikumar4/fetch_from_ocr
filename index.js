// Import packages
const express = require("express");
const home = require("./fetch_data_from_ocr2");

// Middlewares
const app = express();
app.use(express.json());
app.get("/check", (req, res) => {
  res.send("working");
});
// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
