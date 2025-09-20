const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data"); // isse ek directory me data folder
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}

// now file bana hai
const filePath = path.join(dataFolder, "example.txt");
// sync way of writing data in file
fs.writeFileSync(filePath, "Hello world, i am learning node js");
console.log("file created successfully");

// reading data from the file
const readContentFile = fs.readFileSync(filePath, "utf-8");
console.log(readContentFile);

// append another line
fs.appendFileSync(filePath, "\n new line in the file added");
console.log("new file content added ");

// async way of creating file
const asyncFilePath = path.join(dataFolder, "async-file.txt");


// THIS IS CALLED CALLBACK HELL 
fs.writeFile(asyncFilePath, "Merhaba Duniya , This is ISTANBULL", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");

  // reading data from async file creation
  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log("Async file data is ", data);

    // appending line in async file
    fs.appendFile(
      asyncFilePath,
      "\n This is a new Line added in Aync file",
      (err) => {
        if (err) throw err;
        console.log("file updated successfully");

        fs.readFile(asyncFilePath, "utf-8", (err, data) => {
          if (err) throw err;
          console.log("Async file data is ", data);
        });
      }
    );
  });
});
