// Use ES Module syntax
import fetch from "node-fetch";
import fs from "fs";

async function urlToImage(url, savePath) {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }

    // Create a writable stream to save the image to a file
    const dest = fs.createWriteStream(savePath);

    // Pipe the image data into the file
    response.body.pipe(dest);

    dest.on("finish", () => {
      console.log(`Image has been saved to ${savePath}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage example:
urlToImage(
  "https://www.shutterstock.com/shutterstock/photos/1979008355/display_1500/stock-photo-sample-of-modern-driver-s-license-front-view-1979008355.jpg",
  "stock-photo-sample-of-modern-driver-s-license-front-view-1979008355.jpg"
);

urlToImage("https://transport.and.nic.in/images/dl2.jpg", "dl2.jpg");
