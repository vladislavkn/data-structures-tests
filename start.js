const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");

console.log(chalk.grey("\n↻ Reloading...\n"));

// Specify the folder containing your Node.js files
const folderPath = "./solutions";

// Read all files in the folder
const files = fs.readdirSync(folderPath);

// Run each Node.js file in sequence
files.forEach((file) => {
  const filePath = path.join(folderPath, file);

  // Check if the file has a '.js' extension
  if (path.extname(file) === ".js") {
    try {
      // Run the Node.js file using child_process.execSync
      execSync(`node ${filePath}`, {
        encoding: "utf-8",
        stdio: "inherit",
      });
    } catch (error) {
      // Log any errors preserving chalk formatting
      console.error(chalk.red(`Error executing ${file}: ${error.message}`));
    }
  } else {
    console.log(chalk.yellow(`${file} is not a Node.js file. Skipping...\n`));
  }
});
