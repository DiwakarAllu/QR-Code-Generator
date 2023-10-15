// Import required packages
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Use inquirer to prompt the user for a URL
inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    // Extract the URL from user input
    const url = answers.URL;

    // Generate a QR code image from the URL
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Write the URL to a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log("Something else went wrong.");
    }
  });

// Explanation:
// This code uses inquirer to prompt the user for a URL.
// It then uses qr-image to generate a QR code image from the URL and saves it as 'qr_img.png'.
// The user-entered URL is also saved to a text file named 'URL.txt'.
