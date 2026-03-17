# 📘 The Complete Node.js Journey: From Zero to Hero

*A comprehensive guide through Node.js fundamentals, structured like a book with practical code examples and detailed explanations.*

**Perfect for beginners!** This book explains every single concept in simple English with complete code examples and step-by-step explanations.

---

## 📖 Table of Contents

### [Chapter 1: Introduction to Node.js Module System](#chapter-1-introduction-to-nodejs-module-system)
### [Chapter 2: Understanding Path Module](#chapter-2-understanding-path-module)
### [Chapter 3: File System Operations](#chapter-3-file-system-operations)
### [Chapter 4: Building HTTP Servers](#chapter-4-building-http-servers)
### [Chapter 5: Callbacks and Asynchronous Programming](#chapter-5-callbacks-and-asynchronous-programming)
### [Chapter 6: Promises - Taming Async Code](#chapter-6-promises-taming-async-code)
### [Chapter 7: Async/Await - Writing Elegant Async Code](#chapter-7-asyncawait-writing-elegant-async-code)
### [Chapter 8: Event Emitters](#chapter-8-event-emitters)
### [Chapter 9: Express.js Fundamentals](#chapter-9-expressjs-fundamentals)
### [Chapter 10: REST API Development](#chapter-10-rest-api-development)
### [Chapter 11: MongoDB with Mongoose](#chapter-11-mongodb-with-mongoose)

---

## Chapter 1: Introduction to Node.js Module System

### 🎯 Learning Objectives
- Understand the CommonJS module system
- Learn how to create and export modules
- Master module importing and error handling
- Know what happens behind the scenes

### 💻 Code Example

**File: `first_module.js`**
```javascript
function sum(num1, num2) {
  return num1 + num2;
}

function subtract(a, b) {
  return Math.abs(a - b);
}

function divide(a, b) {
  if (b == 0) {
    throw new Error("Can not divide by zero");
  }
  return a / b;
}

module.exports = {
  sum,
  subtract,
  divide,
};
```

**File: `index.js`**
```javascript
const md = require("./first_module");

const ans = md.sum(3, 6);
console.log(ans);

try {
  console.log("trying to divide by zero");
  let result = md.divide(3, 0);
  console.log(result);
} catch (err) {
  console.log("caught an error", err.message);
}

// Module wrapper concept
/*
(function (exports, require, module, __filename, __dirname)){
     // your module code 
}
)
*/
```

### 📝 Explanation

#### **What is the Module System?**

Node.js uses the **CommonJS module system** to organize code into reusable pieces. Every file in Node.js is treated as a separate module with its own scope.

Think of modules like chapters in a book - each chapter (module) has its own content, but you can reference other chapters when needed.

#### **Detailed Breakdown:**

##### **Part 1: Creating Functions in first_module.js**

1. **`sum(num1, num2)`**: 
   - Takes two numbers as input (parameters)
   - Returns their addition
   - Example: `sum(3, 6)` returns `9`

2. **`subtract(a, b)`**: 
   - Takes two numbers
   - Returns absolute difference (always positive)
   - Uses `Math.abs()` to remove negative sign
   - Example: `subtract(10, 3)` returns `7`, `subtract(3, 10)` also returns `7`

3. **`divide(a, b)`**: 
   - Takes two numbers
   - **Safety check**: If `b` (divisor) is zero, throws an error
   - Why? Division by zero is undefined in mathematics
   - If not zero, returns the division result
   - Example: `divide(10, 2)` returns `5`

##### **Part 2: Exporting with `module.exports`**

```javascript
module.exports = {
  sum,
  subtract,
  divide,
};
```

**What does this mean?**
- `module.exports` is like putting your functions in a box to share with other files
- The `{ sum, subtract, divide }` syntax creates an object with these three functions
- Other files can now use these functions by requiring this module
- Without `module.exports`, these functions are private and cannot be used elsewhere

**Alternative export methods:**
```javascript
// Method 1: Export as object (what we used)
module.exports = { sum, subtract, divide };

// Method 2: Export individually
module.exports.sum = sum;
module.exports.subtract = subtract;
module.exports.divide = divide;

// Method 3: Export one thing
module.exports = sum;
```

##### **Part 3: Importing with `require()`**

```javascript
const md = require("./first_module");
```

**Step-by-step explanation:**
1. `require()` is a built-in Node.js function to import modules
2. `"./first_module"` tells Node.js to look for `first_module.js` in the same folder
3. The `./` means "current directory"
4. Node.js automatically adds `.js` extension
5. `md` is the variable name (you can name it anything, like `math`, `operations`, etc.)
6. After importing, `md` contains all exported functions: `{ sum, subtract, divide }`

**How to use imported functions:**
```javascript
md.sum(3, 6);        // Call sum function
md.subtract(10, 5);  // Call subtract function
md.divide(20, 4);    // Call divide function
```

##### **Part 4: Using the Imported Functions**

```javascript
const ans = md.sum(3, 6);
console.log(ans);
```

**What happens here:**
1. `md.sum(3, 6)` calls the sum function with arguments 3 and 6
2. The function returns `9`
3. `const ans` stores this result in a variable named `ans`
4. `console.log(ans)` prints `9` to the terminal

##### **Part 5: Error Handling with Try-Catch**

```javascript
try {
  console.log("trying to divide by zero");
  let result = md.divide(3, 0);
  console.log(result);
} catch (err) {
  console.log("caught an error", err.message);
}
```

**Why use try-catch?**
- When code might fail (like dividing by zero), we wrap it in `try-catch`
- `try` block: Code that might cause an error
- `catch` block: Code that runs if an error occurs
- This prevents the program from crashing

**Step-by-step flow:**
1. Prints: `"trying to divide by zero"`
2. Calls `md.divide(3, 0)` - tries to divide 3 by 0
3. Inside `divide()` function: `if (b == 0)` is true, so it throws an error
4. When error is thrown, JavaScript immediately jumps to `catch` block
5. `catch (err)` catches the error object
6. `err.message` contains the error text: `"Can not divide by zero"`
7. Prints: `"caught an error Can not divide by zero"`

**Without try-catch**, the program would crash and show a scary red error. With try-catch, we handle it gracefully!

##### **Part 6: The Module Wrapper Function**

Every JavaScript file in Node.js is wrapped in this special function:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your actual code goes here
});
```

**What are these 5 magic variables?**

1. **`exports`**: 
   - Shortcut to `module.exports`
   - Used to export functions/objects
   - Example: `exports.sum = sum;`

2. **`require`**: 
   - Function to import other modules
   - Example: `const fs = require('fs');`

3. **`module`**: 
   - Represents the current file/module
   - Has property `exports` to share code
   - Example: `module.exports = myFunction;`

4. **`__filename`**: 
   - Contains the full path of current file
   - Example: `C:\Users\Abhishek\Desktop\webdev\NodeJS\2.node_module_system\first_module.js`
   - Useful for file operations

5. **`__dirname`**: 
   - Contains the folder path of current file
   - Example: `C:\Users\Abhishek\Desktop\webdev\NodeJS\2.node_module_system`
   - Useful for creating paths to other files

**Important:** These variables are only available in CommonJS modules (not in ES6 modules or browser JavaScript)

#### **Complete Execution Flow:**

When you run `node index.js`:

1. Node.js reads `index.js`
2. Encounters `require("./first_module")`
3. Pauses and loads `first_module.js`
4. Executes all code in `first_module.js`
5. Gets the `module.exports` object
6. Returns it to `index.js` as `md`
7. Continues executing `index.js`
8. Calls `md.sum(3, 6)` → prints `9`
9. Enters try-catch block
10. Tries to divide by zero → error thrown
11. Catches error → prints error message
12. Program ends successfully

#### **Output:**
```
9
trying to divide by zero
caught an error Can not divide by zero
```

#### **Common Mistakes to Avoid:**

❌ **Forgetting to export:**
```javascript
// first_module.js
function sum(a, b) { return a + b; }
// Forgot module.exports!

// index.js
const md = require('./first_module');
md.sum(2, 3); // ERROR: md.sum is not a function
```

✅ **Correct:**
```javascript
// first_module.js
function sum(a, b) { return a + b; }
module.exports = { sum }; // Export it!
```

❌ **Wrong path in require:**
```javascript
const md = require('first_module'); // ERROR: Node.js won't find it
```

✅ **Correct:**
```javascript
const md = require('./first_module'); // Use ./ for local files
```

#### **Real-World Use Cases:**

- **Utility functions**: Math operations, string formatting, date helpers
- **Configuration**: Database settings, API keys
- **Models**: Data structures for your application
- **Controllers**: Business logic functions
- **Middleware**: Functions that process requests

---

## Chapter 2: Understanding Path Module

### 🎯 Learning Objectives
- Master path manipulation in Node.js
- Learn cross-platform path handling
- Understand path joining, normalization, and parsing
- Know why path module is better than string concatenation

### 💻 Code Example

**File: `index.js`**
```javascript
const path = require('path');
console.log("directory name is ", path.dirname(__filename));
console.log("file name is ", path.basename(__filename));
console.log("file extension ", path.extname(__filename));

const joinPath = path.join("/users","documents","node","projects");
console.log("Joined Path is - ", joinPath);

const normalizePath = path.normalize("/user/.documents/.../node_folder")
console.log("normalizePath is", normalizePath);
```

### 📝 Explanation

#### **What is the Path Module?**

The `path` module is a built-in Node.js tool that helps you work with file and folder paths easily and safely.

**Why do we need it?**
Different operating systems use different path formats:
- **Windows**: Uses backslashes `\` → `C:\Users\Documents\file.txt`
- **Mac/Linux**: Uses forward slashes `/` → `/home/documents/file.txt`

The `path` module automatically handles these differences so your code works on all systems!

#### **Detailed Breakdown:**

##### **Part 1: Importing the Path Module**

```javascript
const path = require('path');
```

**Explanation:**
- `require('path')` loads the built-in path module
- No need to install anything - it comes with Node.js
- We store it in variable `path` to use its functions
- This is a core module (built into Node.js)

##### **Part 2: Understanding `__filename`**

Before we dive into path methods, let's understand what `__filename` is:

```javascript
console.log(__filename);
// Output: C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module\index.js
```

- `__filename` is a special variable available in every Node.js file
- It contains the **absolute path** (complete address) of the current file
- Absolute path means the full path from the root drive/folder

##### **Part 3: `path.dirname(__filename)`**

```javascript
console.log("directory name is ", path.dirname(__filename));
```

**What it does:**
- Takes a path and returns only the folder/directory part
- Removes the filename from the end

**Example breakdown:**
```
Input:  C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module\index.js
Output: C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module
```

**Real-life analogy:**
If a file's address is like your home address:
- Full address: "House #123, Street 5, New Delhi, India"
- `dirname` gives you: "New Delhi, India" (just the location, not the specific house)

**Use case:**
```javascript
// You want to read a file in the same folder
const currentFile = __filename;
const folderPath = path.dirname(currentFile);
const configFile = path.join(folderPath, 'config.json');
```

##### **Part 4: `path.basename(__filename)`**

```javascript
console.log("file name is ", path.basename(__filename));
```

**What it does:**
- Extracts just the filename from a full path
- Returns the last part of the path

**Example breakdown:**
```
Input:  C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module\index.js
Output: index.js
```

**With extension removed:**
```javascript
path.basename(__filename, '.js'); // Output: index
```

**Use case:**
```javascript
// Display uploaded file name to user
const uploadedFile = "/uploads/user123/photo.jpg";
const fileName = path.basename(uploadedFile); // "photo.jpg"
console.log(`Your file ${fileName} was uploaded successfully!`);
```

##### **Part 5: `path.extname(__filename)`**

```javascript
console.log("file extension ", path.extname(__filename));
```

**What it does:**
- Returns the file extension (the part after the last dot)
- Includes the dot in the result

**Example breakdown:**
```
Input:  C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module\index.js
Output: .js
```

**More examples:**
```javascript
path.extname('photo.jpg');        // '.jpg'
path.extname('archive.tar.gz');   // '.gz'
path.extname('no-extension');     // '' (empty string)
path.extname('.hidden-file');     // '' (dot files have no extension)
```

**Use case:**
```javascript
// Check if uploaded file is an image
const ext = path.extname(uploadedFile);
if (ext === '.jpg' || ext === '.png') {
  console.log('Image uploaded!');
} else {
  console.log('Only JPG and PNG allowed!');
}
```

##### **Part 6: `path.join()`**

```javascript
const joinPath = path.join("/users","documents","node","projects");
console.log("Joined Path is - ", joinPath);
```

**What it does:**
- Joins multiple path segments into one complete path
- Automatically adds the correct separator (`/` or `\`) based on OS
- Cleans up extra separators

**Output:**
```
On Windows: \users\documents\node\projects
On Mac/Linux: /users/documents/node/projects
```

**Why use `path.join()` instead of string concatenation?**

❌ **Wrong way (string concatenation):**
```javascript
const folder = "data";
const file = "test.txt";
const badPath = folder + "/" + file; // "data/test.txt"

// Problem: This won't work on Windows!
```

✅ **Correct way (path.join):**
```javascript
const folder = "data";
const file = "test.txt";
const goodPath = path.join(folder, file); // Works on all systems!
```

**Real-world example:**
```javascript
// Building a path to a config file
const configPath = path.join(__dirname, 'config', 'database.json');
// Result: C:\project\config\database.json (Windows)
//         /project/config/database.json (Linux)
```

**How it handles messy paths:**
```javascript
path.join('/users', '/documents/', '/file.txt');
// Output: /users/documents/file.txt (removes duplicate slashes)
```

##### **Part 7: `path.normalize()`**

```javascript
const normalizePath = path.normalize("/user/.documents/.../node_folder")
console.log("normalizePath is", normalizePath);
```

**What it does:**
- Cleans up and standardizes a path
- Resolves `.` (current directory) and `..` (parent directory)
- Removes redundant separators

**Breaking down the example:**
```
Input:  /user/.documents/.../node_folder
Step 1: /user/.documents/../node_folder  (treat ... as ..)
Step 2: /user/node_folder               (go up one level from .documents)
Output: /user/node_folder
```

**More examples:**
```javascript
path.normalize('/foo/bar/../baz');
// Output: /foo/baz (bar/.. cancels out)

path.normalize('/foo//bar///baz');
// Output: /foo/bar/baz (removes extra slashes)

path.normalize('./foo/bar/./baz');
// Output: foo/bar/baz (removes ./ which means current folder)
```

**Use case:**
```javascript
// User inputs a messy path
const userInput = "/uploads/../images/./photos//vacation.jpg";
const cleanPath = path.normalize(userInput);
// Result: /uploads/images/photos/vacation.jpg
```

#### **Complete Output of Our Code:**

When you run `node index.js`:

```
directory name is  C:\Users\Abhishek\Desktop\webdev\NodeJS\4.path-module
file name is  index.js
file extension  .js
Joined Path is -  \users\documents\node\projects
normalizePath is \user\node_folder
```

*(Note: On Mac/Linux, you'll see forward slashes `/` instead of backslashes `\`)*

#### **Additional Useful Path Methods:**

##### **`path.parse()`**
Breaks a path into its components:
```javascript
const parsed = path.parse('/home/user/file.txt');
console.log(parsed);
/*
{
  root: '/',           // Root folder
  dir: '/home/user',   // Directory path
  base: 'file.txt',    // Filename with extension
  ext: '.txt',         // Extension
  name: 'file'         // Filename without extension
}
*/
```

##### **`path.format()`**
Opposite of parse - builds a path from components:
```javascript
const formatted = path.format({
  root: '/',
  dir: '/home/user',
  base: 'file.txt'
});
console.log(formatted); // '/home/user/file.txt'
```

##### **`path.isAbsolute()`**
Checks if a path is absolute (complete):
```javascript
path.isAbsolute('/foo/bar');   // true
path.isAbsolute('foo/bar');    // false
path.isAbsolute('C:\\foo');    // true (Windows)
```

##### **`path.resolve()`**
Converts relative paths to absolute paths:
```javascript
path.resolve('www', 'img', 'photo.jpg');
// If current directory is /home/user/project
// Output: /home/user/project/www/img/photo.jpg
```

#### **Common Mistakes to Avoid:**

❌ **Using hardcoded separators:**
```javascript
const myPath = 'folder\\subfolder\\file.txt'; // Only works on Windows!
```

✅ **Use path.join():**
```javascript
const myPath = path.join('folder', 'subfolder', 'file.txt'); // Works everywhere!
```

❌ **Manual string concatenation:**
```javascript
const filePath = folderName + '/' + fileName; // Breaks on Windows
```

✅ **Use path.join():**
```javascript
const filePath = path.join(folderName, fileName); // Perfect!
```

#### **Why Path Module is Important:**

1. **Cross-Platform Compatibility**: 
   - Write code once, runs on Windows, Mac, and Linux
   - No need to check which OS the user has

2. **Prevents Bugs**: 
   - No accidental double slashes `//` or missing slashes
   - Handles edge cases automatically

3. **Cleaner Code**: 
   - More readable than string concatenation
   - Self-documenting (code explains itself)

4. **Security**: 
   - Helps prevent directory traversal attacks
   - Validates path formats

#### **Real-World Applications:**

- **File upload systems**: Build safe paths for uploaded files
- **Configuration management**: Locate config files reliably
- **Static file serving**: Serve images, CSS, JS from folders
- **Build tools**: Process files in specific directories
- **CLI tools**: Navigate file system based on user input

---

## Chapter 3: File System Operations

### 🎯 Learning Objectives
- Learn synchronous and asynchronous file operations
- Understand the difference between blocking and non-blocking code
- Master file creation, reading, updating, and deletion
- Understand callback hell and why it's a problem
- Learn how to work with folders and files together

### 💻 Code Example

**File: `index.js`**
```javascript
const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}

// Creating file synchronously
const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello world, i am learning node js");
console.log("file created successfully");

// Reading file synchronously
const readContentFile = fs.readFileSync(filePath, "utf-8");
console.log(readContentFile);

// Appending data synchronously
fs.appendFileSync(filePath, "\n new line in the file added");
console.log("new file content added ");

// Asynchronous file operations (Callback Hell Example)
const asyncFilePath = path.join(dataFolder, "async-file.txt");

fs.writeFile(asyncFilePath, "Merhaba Duniya , This is ISTANBULL", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");

  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log("Async file data is ", data);

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
```

### 📝 Explanation

#### **What is the File System (fs) Module?**

The `fs` module is Node.js's built-in tool that lets you read and write files on your computer. It's like having a file manager that you can control with code!

**Two Types of Operations:**

1. **Synchronous (Sync)**: 
   - Blocks/pauses everything else until finished
   - Like waiting in line at a store - nothing else happens until you're done
   - Methods end with `Sync` (e.g., `readFileSync`, `writeFileSync`)
   - Simpler to write but can slow down your app

2. **Asynchronous (Async)**: 
   - Non-blocking - other code continues running
   - Like ordering food and getting a buzzer - you can do other things while waiting
   - Uses callbacks (functions that run when operation completes)
   - Better for apps that need to stay responsive

---

#### **Detailed Breakdown:**

##### **Part 1: Importing Required Modules**

```javascript
const fs = require("fs");
const path = require("path");
```

**Explanation:**
- `require("fs")` loads the File System module
- `require("path")` loads the Path module (from Chapter 2)
- We need both: `fs` for file operations, `path` for building safe file paths

---

##### **Part 2: Creating a Folder**

```javascript
const dataFolder = path.join(__dirname, "data");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}
```

**Step-by-step explanation:**

**Line 1:** `const dataFolder = path.join(__dirname, "data");`
- `__dirname` = current folder path (e.g., `C:\Projects\NodeJS\5.file-system`)
- `path.join()` = safely combines paths
- Result: `dataFolder` = `C:\Projects\NodeJS\5.file-system\data`
- We're creating a path to a folder named "data"

**Line 2:** `if (!fs.existsSync(dataFolder)) {`
- `fs.existsSync()` checks if a folder/file exists
- Returns `true` if it exists, `false` if it doesn't
- The `!` means "not" - so this reads: "if the folder does NOT exist"
- We only want to create the folder if it doesn't already exist

**Line 3:** `fs.mkdirSync(dataFolder);`
- `mkdirSync` = "make directory synchronously"
- Creates the folder at the specified path
- "Sync" means it blocks/pauses until the folder is created

**Line 4:** `console.log("data folder created");`
- Prints confirmation message

**Why check if it exists first?**
If we try to create a folder that already exists, Node.js will throw an error. The check prevents crashes!

---

##### **Part 3: Writing to a File (Synchronous)**

```javascript
const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello world, i am learning node js");
console.log("file created successfully");
```

**Step-by-step:**

**Line 1:** `const filePath = path.join(dataFolder, "example.txt");`
- Builds the complete path to our file
- Result: `C:\Projects\NodeJS\5.file-system\data\example.txt`

**Line 2:** `fs.writeFileSync(filePath, "Hello world, i am learning node js");`
- `writeFileSync` = write file synchronously
- First argument: where to write (file path)
- Second argument: what to write (text content)
- Creates the file if it doesn't exist
- Overwrites the file if it already exists
- Blocks/pauses until writing is complete

**Line 3:** `console.log("file created successfully");`
- Only runs AFTER the file is completely written (because it's synchronous)

**What happens behind the scenes:**
1. Node.js asks the operating system to create a file
2. Waits for the OS to finish writing
3. Once done, moves to the next line of code

---

##### **Part 4: Reading a File (Synchronous)**

```javascript
const readContentFile = fs.readFileSync(filePath, "utf-8");
console.log(readContentFile);
```

**Explanation:**

**Line 1:** `const readContentFile = fs.readFileSync(filePath, "utf-8");`
- `readFileSync` = read file synchronously
- First argument: which file to read
- Second argument: `"utf-8"` = encoding format (how to interpret the bytes)
  - UTF-8 converts binary data to readable text
  - Without this, you'd get weird binary data instead of text
- Returns the file content as a string
- Stores it in variable `readContentFile`

**Line 2:** `console.log(readContentFile);`
- Prints the file content
- Output: `Hello world, i am learning node js`

**Common encodings:**
- `'utf-8'` - Text (most common)
- `'ascii'` - Basic English characters
- `'base64'` - Binary data as text
- No encoding - returns raw binary data (Buffer)

---

##### **Part 5: Appending to a File (Synchronous)**

```javascript
fs.appendFileSync(filePath, "\n new line in the file added");
console.log("new file content added ");
```

**Explanation:**

**Line 1:** `fs.appendFileSync(filePath, "\n new line in the file added");`
- `appendFileSync` = add content to end of file synchronously
- First argument: file path
- Second argument: text to add
- `\n` = newline character (creates a line break)
- Does NOT overwrite existing content - adds to the end!

**What the file contains now:**
```
Hello world, i am learning node js
 new line in the file added
```

**Difference between `writeFile` and `appendFile`:**
- `writeFile` = Replaces entire content (like saving a document)
- `appendFile` = Adds to the end (like adding a footnote)

---

##### **Part 6: Asynchronous File Operations**

Now let's look at the async version. This is more complex but very important!

```javascript
const asyncFilePath = path.join(dataFolder, "async-file.txt");

fs.writeFile(asyncFilePath, "Merhaba Duniya , This is ISTANBULL", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");

  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log("Async file data is ", data);

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
```

**Understanding Asynchronous Code:**

**Key differences from sync:**
1. No `Sync` at the end of method names
2. Last argument is a **callback function** `(err) => { ... }`
3. Code doesn't wait - continues executing immediately
4. Callback runs when operation completes

---

**Breaking Down Each Async Operation:**

###### **Step 1: Create File Asynchronously**

```javascript
fs.writeFile(asyncFilePath, "Merhaba Duniya , This is ISTANBULL", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");
  // More code inside here...
});
```

**Parameters:**
1. `asyncFilePath` - Where to create the file
2. `"Merhaba Duniya..."` - Content to write
3. `(err) => { ... }` - Callback function (runs when done)

**Callback function:**
- Receives `err` parameter (error object if something went wrong)
- `if (err) throw err;` - If there's an error, stop and show it
- `console.log(...)` - Runs only if file was created successfully
- Everything inside this callback runs AFTER the file is created

**Important:** Unlike sync version, JavaScript doesn't wait here. It starts the file creation and immediately moves to other code. When creation finishes, the callback runs.

---

###### **Step 2: Read File Inside Callback**

```javascript
fs.readFile(asyncFilePath, "utf-8", (err, data) => {
  if (err) throw err;
  console.log("Async file data is ", data);
  // More code inside here...
});
```

**Why inside the first callback?**
We must wait for the file to be created BEFORE we can read it! This creates nesting.

**Parameters:**
1. `asyncFilePath` - Which file to read
2. `"utf-8"` - Encoding to convert binary to text
3. `(err, data) => { ... }` - Callback with two parameters:
   - `err` - Error object (null if successful)
   - `data` - File content (the actual text we read)

**Callback execution:**
- If error occurs: `err` contains error info, `data` is undefined
- If successful: `err` is null, `data` contains file content
- We check `if (err) throw err;` first to handle errors
- Then log the data: `"Merhaba Duniya , This is ISTANBULL"`

---

###### **Step 3: Append to File (Third Level)**

```javascript
fs.appendFile(
  asyncFilePath,
  "\n This is a new Line added in Aync file",
  (err) => {
    if (err) throw err;
    console.log("file updated successfully");
    // More code inside here...
  }
);
```

**This is inside the readFile callback**, creating another nesting level.

**Parameters:**
1. File path
2. Text to append
3. Callback function

**What happens:**
- Adds new line to the file
- Callback runs when append is complete
- Logs success message

---

###### **Step 4: Read Again (Fourth Level)**

```javascript
fs.readFile(asyncFilePath, "utf-8", (err, data) => {
  if (err) throw err;
  console.log("Async file data is ", data);
});
```

**Final nesting level** - reads the file again to show the appended content.

**Output:**
```
Merhaba Duniya , This is ISTANBULL
 This is a new Line added in Aync file
```

---

#### **What is Callback Hell?**

**Callback Hell** (also called "Pyramid of Doom") is what happens when you nest too many callbacks inside each other.

**Visual appearance:**
```javascript
outerFunction(() => {
  middleFunction(() => {
    innerFunction(() => {
      deeperFunction(() => {
        // Keeps going deeper...
      });
    });
  });
});
```

Notice how the code forms a triangle/pyramid shape? That's why it's called "Pyramid of Doom"!

**Problems with Callback Hell:**

1. **Hard to read**: Too much indentation, hard to follow the flow
2. **Difficult to debug**: Errors can be confusing to trace
3. **Hard to maintain**: Changing one part might break everything
4. **Error handling complexity**: Need to handle errors at each level
5. **Code duplication**: Similar error handling repeated everywhere

**Our Example:**
```javascript
fs.writeFile(..., (err) => {         // Level 1
  if (err) throw err;
  
  fs.readFile(..., (err, data) => {  // Level 2
    if (err) throw err;
    
    fs.appendFile(..., (err) => {    // Level 3
      if (err) throw err;
      
      fs.readFile(..., (err, data) => {  // Level 4
        if (err) throw err;
      });
    });
  });
});
```

**Solutions to Callback Hell:**

✅ **Named Functions** (slightly better):
```javascript
function handleFinalRead(err, data) {
  if (err) throw err;
  console.log("Final data:", data);
}

function handleAppend(err) {
  if (err) throw err;
  console.log("Appended!");
  fs.readFile(asyncFilePath, "utf-8", handleFinalRead);
}

function handleFileRead(err, data) {
  if (err) throw err;
  console.log("Data:", data);
  fs.appendFile(asyncFilePath, "\nNew line", handleAppend);
}

fs.writeFile(asyncFilePath, "content", handleFileRead);
```

✅ **Promises** (much better - covered in Chapter 6):
```javascript
fs.promises.writeFile(file, "content")
  .then(() => fs.promises.readFile(file, "utf-8"))
  .then(data => {
    console.log(data);
    return fs.promises.appendFile(file, "\nNew line");
  })
  .then(() => fs.promises.readFile(file, "utf-8"))
  .then(data => console.log(data));
```

✅ **Async/Await** (best - covered in Chapter 7):
```javascript
async function processFile() {
  await fs.promises.writeFile(file, "content");
  const data = await fs.promises.readFile(file, "utf-8");
  console.log(data);
  await fs.promises.appendFile(file, "\nNew line");
  const newData = await fs.promises.readFile(file, "utf-8");
  console.log(newData);
}
```

---

#### **Complete Execution Flow:**

When you run `node index.js`:

**Immediate execution (synchronous part):**
1. Import `fs` and `path` modules ✓
2. Create `data` folder ✓
3. Write `example.txt` synchronously ✓
4. Read and log content: `"Hello world, i am learning node js"` ✓
5. Append to `example.txt` ✓
6. Start async `writeFile` for `async-file.txt` ⏳
7. JavaScript doesn't wait - continues (but no more code!)

**Async execution (happens in background):**
8. ⏳ File creation completes → callback fires
9. Log: `"Async file is created successfully"`
10. Start async `readFile` ⏳
11. ⏳ Reading completes → callback fires
12. Log: `"Async file data is  Merhaba Duniya , This is ISTANBULL"`
13. Start async `appendFile` ⏳
14. ⏳ Appending completes → callback fires
15. Log: `"file updated successfully"`
16. Start async `readFile` again ⏳
17. ⏳ Reading completes → callback fires
18. Log: `"Async file data is  Merhaba Duniya , This is ISTANBULL\n This is a new Line added in Aync file"`
19. Program ends

---

#### **Complete Output:**

```
data folder created
file created successfully
Hello world, i am learning node js
new file content added 
Async file is created successfully
Async file data is  Merhaba Duniya , This is ISTANBULL
file updated successfully
Async file data is  Merhaba Duniya , This is ISTANBULL
 This is a new Line added in Aync file
```

**Note:** The async output appears after all sync code finishes!

---

#### **Sync vs Async - When to Use Which?**

**Use Synchronous (Sync) when:**
- ✅ Simple scripts/one-time tasks
- ✅ Small files that load quickly
- ✅ Learning/testing (easier to understand)
- ✅ Command-line tools (no need for responsiveness)
- ✅ Application startup (loading config files)

**Use Asynchronous (Async) when:**
- ✅ Building web servers (need to handle multiple requests)
- ✅ Large files (don't want to freeze the app)
- ✅ User interfaces (must stay responsive)
- ✅ Production applications
- ✅ Multiple file operations (can run in parallel)

---

#### **Common File System Operations Reference:**

| Method | Description | Sync/Async |
|--------|-------------|------------|
| `readFile()` | Read entire file | Both |
| `writeFile()` | Write/create file (overwrites) | Both |
| `appendFile()` | Add to end of file | Both |
| `unlink()` | Delete file | Both |
| `mkdir()` | Create folder | Both |
| `rmdir()` | Delete folder | Both |
| `readdir()` | List folder contents | Both |
| `stat()` | Get file info (size, dates) | Both |
| `existsSync()` | Check if path exists | Sync only |
| `rename()` | Rename/move file | Both |

**Pattern:** Most methods have both sync and async versions:
- Sync: `readFileSync`, `writeFileSync`, etc.
- Async: `readFile`, `writeFile`, etc. (callback-based)

---

#### **Error Handling Best Practices:**

❌ **Bad error handling:**
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err; // Crashes the app!
});
```

✅ **Good error handling:**
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Failed to read file:', err.message);
    return; // Stop execution gracefully
  }
  console.log('File content:', data);
});
```

✅ **Even better - user-friendly:**
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found. Please check the filename.');
    } else {
      console.log('An error occurred:', err.message);
    }
    return;
  }
  console.log('Success!', data);
});
```

---

#### **Real-World Applications:**

1. **Log files**: Append logs to track application activity
2. **Configuration**: Read/write app settings
3. **File uploads**: Save uploaded files to disk
4. **Static websites**: Serve HTML/CSS files
5. **Data export**: Write reports to CSV/Excel files
6. **Backup systems**: Copy files to backup locations
7. **Build tools**: Process and bundle source files

---

## Chapter 4: Building HTTP Servers

### 🎯 Learning Objectives
- Understand what a web server is and how it works
- Learn the HTTP module in Node.js
- Create your own web server from scratch
- Understand request and response objects
- Implement basic routing
- Know about HTTP status codes and headers
- Learn about ports and how to access your server

### 💻 Code Example

**Basic Server - `server.js`**
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello nodejs from http module");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}`);
});
```

**Routing Example - `routes.js`**
```javascript
const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  
  if(url === "/") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Home Page");
  } else if(url === "/projects") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Project page  ");
  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("This page does not exists");
  }
});

const port = 80;
server.listen(port, () => {
  console.log(`Server is now listening to port ${port}`);
});
```

### 📝 Explanation

#### **What is a Web Server?**

A **web server** is a program that listens for requests from web browsers and sends back responses.

**Real-life analogy:**
Think of a restaurant:
- **Server** = The waiter who takes orders and brings food
- **Request** = Customer's order ("I want pizza")
- **Response** = The food that waiter brings back
- **Port** = The table number where customer is sitting
- **URL** = What the customer ordered (pizza, burger, etc.)

**How web servers work:**
1. You start the server (open the restaurant)
2. Server waits for requests (waiter waits for customers)
3. Browser sends request (customer places order)
4. Server processes request (kitchen prepares food)
5. Server sends response (waiter serves food)
6. Connection closes (customer finishes meal)

---

#### **Part 1: Importing the HTTP Module**

```javascript
const http = require('http');
```

**Explanation:**
- `require('http')` loads Node.js's built-in HTTP module
- This module has all the tools needed to create a web server
- No installation needed - comes with Node.js!
- We store it in variable `http` to use its functions

---

#### **Part 2: Creating the Server**

```javascript
const server = http.createServer((req, res) => {
  // This function runs every time someone visits your website
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello nodejs from http module");
});
```

**Breaking it down:**

**`http.createServer()`**:
- This function creates a new web server
- Takes a callback function that runs for EVERY request
- The callback receives two parameters: `req` and `res`

**Callback Parameters:**

1. **`req` (Request object)**:
   - Contains information about the incoming request
   - What the browser is asking for
   - Includes: URL, method (GET/POST), headers, data
   
   **Example info in `req`:**
   ```javascript
   req.url      // "/about" or "/contact"
   req.method   // "GET" or "POST"
   req.headers  // Browser info, cookies, etc.
   ```

2. **`res` (Response object)**:
   - Used to send data back to the browser
   - You control what the user sees
   - Methods: `writeHead()`, `end()`, `write()`
   
   **What you can do with `res`:**
   ```javascript
   res.writeHead(200)           // Set status code
   res.end("Hello")             // Send text
   res.write("More data")       // Send more before ending
   ```

**Inside the callback:**

**Line 1:** `res.writeHead(200, {'Content-Type': 'text/plain'});`
- `writeHead()` sets the HTTP response headers
- First argument `200` = status code (means "Success" / "OK")
- Second argument = headers object
  - `'Content-Type': 'text/plain'` tells browser we're sending plain text
  - Browser uses this to know how to display the content

**Line 2:** `res.end("Hello nodejs from http module");`
- `end()` sends the response and closes the connection
- The string inside is what the user sees in their browser
- Must call `end()` to finish the response

---

#### **Part 3: Starting the Server**

```javascript
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}`);
});
```

**Explanation:**

**Line 1:** `const PORT = 4000;`
- A **port** is like a door number on a building
- Your computer is the building, ports are the doors
- Different services use different ports
- Common ports:
  - `80` - HTTP (websites)
  - `443` - HTTPS (secure websites)
  - `3000` - Common development port
  - `4000` - Our example port

**Line 2:** `server.listen(PORT, () => { ... });`
- `listen()` starts the server and makes it wait for requests
- First argument: which port to listen on (4000)
- Second argument: callback that runs when server starts successfully
- Like opening your shop and putting up "Open" sign

**Callback:**
```javascript
() => {
  console.log(`Server is now listening to port ${PORT}`);
}
```
- Runs once when server successfully starts
- Confirms server is ready to accept requests
- You'll see this message in your terminal

---

#### **Part 4: Understanding Routing**

**What is Routing?**

**Routing** is deciding which response to send based on the URL the user visits.

**Analogy:**
Imagine a big office building:
- Different room numbers = Different URLs
- Receptionist = Router
- You tell receptionist which room you want (URL)
- Receptionist directs you to the right place

**Our Routing Code:**
```javascript
const url = req.url;

if(url === "/") {
  // Home page
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Home Page");
} else if(url === "/projects") {
  // Projects page
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Project page  ");
} else {
  // Page not found
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end("This page does not exists");
}
```

**Step-by-step flow:**

**Line 1:** `const url = req.url;`
- Gets the URL path from the request
- Examples:
  - Visiting `http://localhost:80/` → `url = "/"`
  - Visiting `http://localhost:80/projects` → `url = "/projects"`
  - Visiting `http://localhost:80/about` → `url = "/about"`

**Line 2:** `if(url === "/") {`
- Checks if user is visiting the home page
- `/` is the root/home page (like `www.example.com`)
- Most common page people visit first

**Lines 3-5:** Home page response
```javascript
res.writeHead(200, {"Content-Type": "text/plain"});
res.end("Home Page");
```
- Status `200` = Everything is OK
- Sends "Home Page" text to browser

**Line 6:** `else if(url === "/projects") {`
- Checks if user is visiting `/projects`
- Like `www.example.com/projects`

**Lines 7-9:** Projects page response
- Similar to home page but sends "Project page" instead

**Line 11:** `else {`
- Catches all other URLs
- If not `/` or `/projects`, then...

**Lines 12-14:** 404 Not Found
```javascript
res.writeHead(404, {"Content-Type": "text/plain"});
res.end("This page does not exists");
```
- Status `404` = Not Found
- Tells user the page doesn't exist
- Important for good user experience!

---

#### **Part 5: HTTP Status Codes Explained**

**What are Status Codes?**

Status codes are 3-digit numbers the server sends to tell the browser what happened.

**Common Status Codes:**

**2xx - Success (Everything went well):**
- `200 OK` - Request successful, here's your data
- `201 Created` - New resource created (like after form submission)
- `204 No Content` - Success but nothing to show

**3xx - Redirection (Go somewhere else):**
- `301 Moved Permanently` - Old URL, use new one
- `302 Found` - Temporarily at different URL
- `304 Not Modified` - Your cached version is still good

**4xx - Client Error (You did something wrong):**
- `400 Bad Request` - Your request was invalid
- `401 Unauthorized` - Need to login first
- `403 Forbidden` - You're not allowed here
- `404 Not Found` - Page doesn't exist
- `405 Method Not Allowed` - Wrong HTTP method

**5xx - Server Error (We messed up):**
- `500 Internal Server Error` - Something broke on server
- `502 Bad Gateway` - Server got confused
- `503 Service Unavailable` - Server is too busy or down

**In our code:**
```javascript
res.writeHead(200); // Success - page found
res.writeHead(404); // Error - page not found
```

---

#### **Part 6: Content-Type Headers**

**What is Content-Type?**

Tells the browser what kind of data you're sending so it knows how to display it.

**Common Content-Types:**

```javascript
'text/plain'              // Plain text (no formatting)
'text/html'               // HTML code (web pages)
'text/css'                // CSS styles
'application/json'        // JSON data
'image/jpeg'              // JPEG image
'image/png'               // PNG image
'application/javascript'  // JavaScript file
'application/pdf'         // PDF document
```

**Examples:**

**Sending plain text:**
```javascript
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end("Just plain text");
```

**Sending HTML:**
```javascript
res.writeHead(200, {'Content-Type': 'text/html'});
res.end("<h1>Hello World</h1><p>This is HTML!</p>");
```

**Sending JSON:**
```javascript
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(JSON.stringify({ name: "John", age: 30 }));
```

**Why it matters:**
- Browser sees `text/html` → renders HTML tags
- Browser sees `text/plain` → shows everything as plain text (even HTML tags!)
- Browser sees `application/json` → knows it's data

---

#### **Complete Execution Flow:**

**When you run `node server.js`:**

1. Node.js loads the `http` module ✓
2. Creates a server object (but doesn't start yet) ✓
3. Calls `server.listen(4000)` ✓
4. Server starts listening on port 4000 ✓
5. Prints: `"Server is now listening to port 4000"` ✓
6. Waits... and waits... and waits... ⏳

**When someone visits `http://localhost:4000/`:**

7. Browser sends HTTP request to your server
8. Server receives request → callback function runs
9. `req.url` equals `/`
10. Executes home page code
11. Sends status 200 and "Home Page" text
12. Connection closes
13. Server goes back to waiting for next request

**When someone visits `http://localhost:4000/projects`:**

14. Browser sends request
15. Server receives request → callback runs
16. `req.url` equals `/projects`
17. Executes projects page code
18. Sends status 200 and "Project page" text
19. Connection closes
20. Server waits for next request

**When someone visits `http://localhost:4000/anything-else`:**

21. Browser sends request
22. Server receives request
23. `req.url` is neither `/` nor `/projects`
24. Goes to `else` block
25. Sends status 404 and error message
26. User sees "This page does not exists"

---

#### **Output in Terminal:**

After running `node server.js`:
```
Server is now listening to port 4000
```

That's it! The server stays running silently until someone visits. Every request gets logged in your terminal if you add console logs:

```javascript
const server = http.createServer((req, res) => {
  console.log(`New request: ${req.url}`); // Add this to see requests!
  // ... rest of code
});
```

Now when you visit pages, you'll see:
```
Server is now listening to port 4000
New request: /
New request: /projects
New request: /about
```

---

#### **How to Test Your Server:**

**Method 1: Using a Web Browser**

1. Run your server: `node server.js`
2. Open Chrome/Firefox/Edge
3. Go to: `http://localhost:4000/`
4. You should see: "Home Page"
5. Try: `http://localhost:4000/projects`
6. You should see: "Project page"
7. Try: `http://localhost:4000/random`
8. You should see: "This page does not exists"

**Method 2: Using Command Line (curl)**

```bash
# Windows PowerShell or Mac/Linux Terminal

# Get home page
curl http://localhost:4000/

# Get projects page
curl http://localhost:4000/projects

# Get 404 page
curl http://localhost:4000/notfound
```

**Method 3: Using Postman**

1. Download Postman (free API testing tool)
2. Create new GET request
3. Enter URL: `http://localhost:4000/`
4. Click "Send"
5. See the response!

---

#### **Understanding Ports Better:**

**What is localhost?**

- `localhost` = your own computer
- Also known as `127.0.0.1` (IP address)
- Used for testing before publishing website
- Only YOU can access it (not public internet)

**Port Numbers:**

- Range from 0 to 65535
- Some are reserved:
  - 0-1023: System ports (need admin access)
  - 80: HTTP (standard web traffic)
  - 443: HTTPS (secure web traffic)
  - 3000-5000: Common development ports

**Which port to use?**

✅ **Good choices for development:**
- 3000 (most popular)
- 4000 (our example)
- 5000, 8000, 8080

❌ **Avoid:**
- Port 80 (needs admin/sudo privileges)
- Port already in use (will get "EADDRINUSE" error)

**If port is already in use:**
```
Error: listen EADDRINUSE: address already in use :::4000
```
Solution: Use a different port like 3000 or 5000

---

#### **Building on This - Next Steps:**

This basic server can be enhanced to:

1. **Serve HTML files:**
```javascript
const fs = require('fs');
if(url === "/") {
  fs.readFile('index.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}
```

2. **Handle form submissions (POST requests):**
```javascript
if(req.method === 'POST' && url === '/submit') {
  // Process form data
}
```

3. **Create API endpoints:**
```javascript
if(url === '/api/users') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
}
```

4. **Serve static files (CSS, JS, images):**
```javascript
if(url === '/style.css') {
  fs.readFile('style.css', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(data);
  });
}
```

---

#### **Common Mistakes to Avoid:**

❌ **Forgetting to call `res.end()`:**
```javascript
res.writeHead(200);
res.write("Hello");
// Forgot res.end() - browser will keep waiting forever!
```

✅ **Always end your response:**
```javascript
res.writeHead(200);
res.write("Hello");
res.end(); // Close the connection
```

❌ **Sending response after connection closed:**
```javascript
res.end("Done");
res.write("More"); // ERROR! Too late!
```

✅ **Send everything before `end()`:**
```javascript
res.write("Part 1");
res.write("Part 2");
res.end("Final part"); // Then close
```

❌ **Not handling 404:**
```javascript
// No else block - unknown URLs get no response!
```

✅ **Always handle unknown routes:**
```javascript
else {
  res.writeHead(404);
  res.end("Not found");
}
```

❌ **Using wrong Content-Type:**
```javascript
// Sending HTML but saying it's plain text
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end("<h1>HTML</h1>"); // Browser shows tags as text!
```

✅ **Match Content-Type to content:**
```javascript
res.writeHead(200, {'Content-Type': 'text/html'});
res.end("<h1>HTML</h1>"); // Browser renders HTML properly
```

---

#### **Real-World Applications:**

What can you build with this knowledge?

1. **Web application backend** - Handle user requests
2. **API server** - Provide data to mobile apps
3. **File server** - Let users download files
4. **Proxy server** - Forward requests to other servers
5. **Chat server** - Real-time messaging
6. **Development server** - Test websites locally
7. **Microservice** - Small specialized service

---

#### **Limitations of Raw HTTP Module:**

While the `http` module is powerful, it requires lots of manual code:
- Manual routing (checking URLs one by one)
- Manual parsing of request bodies
- Manual handling of different HTTP methods
- Repetitive code for common tasks

**Solution:** Use a framework like **Express.js** (covered in Chapter 9) which simplifies all of this!

But understanding the raw `http` module helps you appreciate what frameworks do for you and gives you complete control when you need it!

---

## Chapter 5: Callbacks and Asynchronous Programming

### 🎯 Learning Objectives
- Understand what callback functions are and why they're important
- Learn the difference between synchronous and asynchronous callbacks
- Master how to write and use callback patterns
- Understand execution order in callback-based code
- Build foundation for understanding async programming

### 💻 Code Example

**File: `index.js`**
```javascript
function Person(name, callback) {
  console.log(`Hello, ${name}`);
  callback(); 
}

function address() {
  console.log("India");
}

Person("Abhishek Kumar Singh", address);
```

### 📝 Explanation

#### **What is a Callback Function?**

A **callback function** is simply a function that is passed as an argument to another function, where it gets executed later.

**Simple analogy:**
Think of ordering food at a restaurant:
- You place your order (call the main function)
- Restaurant gives you a buzzer (the callback)
- When food is ready, they activate the buzzer (execute the callback)
- Buzzer beeps and you pick up your food (callback runs)

**In programming terms:**
- Instead of doing everything in one function
- You pass a "to-do later" function as a parameter
- That function runs when needed

---

#### **Detailed Breakdown:**

##### **Part 1: Defining the Person Function**

```javascript
function Person(name, callback) {
  console.log(`Hello, ${name}`);
  callback(); 
}
```

**Parameters explained:**

1. **`name`**: 
   - A regular string parameter
   - Stores the person's name
   - Used in the greeting message

2. **`callback`**: 
   - This is a function (not a string or number)
   - Will be called/executed inside the Person function
   - The parentheses `()` after it trigger its execution
   - Could be any function - that's the beauty of callbacks!

**Inside the function:**

**Line 1:** `console.log(\`Hello, ${name}\`);`
- Uses template literals (backticks `` ` ``)
- `${name}` inserts the name variable into the string
- Prints greeting first

**Line 2:** `callback();`
- Executes whatever function was passed as callback
- The `()` means "run this function now"
- Runs AFTER the console.log (order matters!)

**Important:** The callback parameter could have any name:
```javascript
function Person(name, myFunction) { }  // Same thing!
function Person(name, doSomething) { } // Also same!
function Person(name, cb) { }          // Short form, also same!
```

---

##### **Part 2: Defining the Address Function**

```javascript
function address() {
  console.log("India");
}
```

**What this does:**
- Simple function with no parameters
- Just prints "India" when called
- This will be used AS the callback

**Note:** We're NOT calling it here (no `address()` with parentheses)
We're just defining it. Later we'll pass it to Person.

---

##### **Part 3: Calling the Person Function**

```javascript
Person("Abhishek Kumar Singh", address);
```

**Arguments passed:**

1. **`"Abhishek Kumar Singh"`**: 
   - First argument → matches `name` parameter
   - A simple string

2. **`address`**: 
   - Second argument → matches `callback` parameter
   - **NOT** `address()` - notice no parentheses!
   - We're passing the FUNCTION ITSELF, not calling it
   - Like giving someone a phone number vs making a call

**What happens step-by-step:**

**Step 1:** JavaScript sees `Person(...)` and starts executing it

**Step 2:** Sets up parameters:
- `name = "Abhishek Kumar Singh"`
- `callback = address` (the function reference)

**Step 3:** Enters Person function body

**Step 4:** Executes `console.log(\`Hello, ${name}\`);`
- Prints: `"Hello, Abhishek Kumar Singh"`

**Step 5:** Executes `callback();`
- Remember: `callback` points to the `address` function
- So this runs `address()`
- Jumps to address function
- Prints: `"India"`
- Returns to Person function

**Step 6:** Person function has no more code, so it ends

**Final Output:**
```
Hello, Abhishek Kumar Singh
India
```

---

#### **Visualizing the Execution Flow:**

```
START
  ↓
Call Person("Abhishek Kumar Singh", address)
  ↓
Set name = "Abhishek Kumar Singh"
Set callback = address function
  ↓
Enter Person function
  ↓
Print "Hello, Abhishek Kumar Singh"
  ↓
Call callback() → jumps to address()
  ↓
Enter address function
  ↓
Print "India"
  ↓
Return from address()
  ↓
Return from Person()
  ↓
END
```

---

#### **Why Are Callbacks Useful?**

Callbacks are everywhere in JavaScript! Here's why:

**1. Event Handling:**
```javascript
button.addEventListener('click', () => {
  console.log('Button was clicked!');
});
```
The arrow function is a callback - it runs WHEN the button is clicked.

**2. Timers:**
```javascript
setTimeout(() => {
  console.log('2 seconds passed!');
}, 2000);
```
The function is a callback - runs AFTER 2 seconds.

**3. Array Methods:**
```javascript
numbers.forEach((num) => {
  console.log(num);
});
```
The function is a callback - runs FOR EACH array element.

**4. File Operations (from Chapter 3):**
```javascript
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log(data);
});
```
Callback runs WHEN file reading completes.

**5. API Requests:**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```
The `.then()` functions are callbacks!

---

#### **Types of Callbacks:**

##### **1. Synchronous Callbacks (Execute Immediately)**

Our `Person` example is synchronous:
```javascript
function Person(name, callback) {
  console.log(`Hello, ${name}`);  // Happens NOW
  callback();                      // Callback happens NOW
}
```

**Characteristics:**
- Runs right away, in order
- Code waits for it to finish
- Predictable execution order
- Like reading a book page by page

**More examples:**
```javascript
// Array forEach
[1, 2, 3].forEach(num => console.log(num));
// Output: 1, then 2, then 3 (immediately, in order)

// String replace
"hello".replace("h", "H");
// Returns "Hello" immediately
```

##### **2. Asynchronous Callbacks (Execute Later)**

From Chapter 3 (file system):
```javascript
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('Reading file...');
```

**Output:**
```
Reading file...
(file content appears here after delay)
```

**Characteristics:**
- Doesn't wait - continues to next line
- Callback runs LATER when operation completes
- Good for slow operations (file reading, network requests)
- Like ordering food and getting a buzzer

**More examples:**
```javascript
// Timer
setTimeout(() => {
  console.log('Done!');
}, 1000);
console.log('Waiting...');
// Output: "Waiting..." immediately, "Done!" after 1 second

// API call
fetch('/api/data').then(data => {
  console.log(data);
});
console.log('Request sent...');
// Output: "Request sent..." immediately, data appears later
```

---

#### **Different Ways to Write Callbacks:**

##### **Method 1: Named Function (What we did)**
```javascript
function address() {
  console.log("India");
}
Person("Abhishek", address);
```

**Pros:** Reusable, clear name, easy to debug

##### **Method 2: Anonymous Function**
```javascript
Person("Abhishek", function() {
  console.log("India");
});
```

**Pros:** Quick, defined inline
**Cons:** Can't reuse, harder to debug if complex

##### **Method 3: Arrow Function (Modern)**
```javascript
Person("Abhishek", () => {
  console.log("India");
});
```

**Pros:** Shorter syntax, modern
**Cons:** Some advanced differences from regular functions

##### **Method 4: Inline One-Liner**
```javascript
Person("Abhishek", () => console.log("India"));
```

**Pros:** Very concise for simple callbacks
**Cons:** Harder to read if logic is complex

---

#### **Common Mistakes to Avoid:**

❌ **Calling the function instead of passing it:**
```javascript
Person("Abhishek", address());  // WRONG!
```
This CALLS address immediately and passes its RETURN VALUE (undefined) instead of the function!

✅ **Pass the function reference:**
```javascript
Person("Abhishek", address);  // CORRECT!
```

❌ **Forgetting parentheses when calling callback:**
```javascript
function Person(name, callback) {
  callback;  // WRONG! This does nothing!
}
```

✅ **Add parentheses to execute:**
```javascript
function Person(name, callback) {
  callback();  // CORRECT!
}
```

❌ **Not checking if callback exists:**
```javascript
function Person(name, callback) {
  callback();  // CRASHES if callback is undefined!
}
```

✅ **Safe approach:**
```javascript
function Person(name, callback) {
  if (typeof callback === 'function') {
    callback();
  }
}
```

---

#### **Advanced Callback Patterns:**

##### **Pattern 1: Multiple Callbacks**
```javascript
function processData(data, onSuccess, onError) {
  if (data.isValid) {
    onSuccess(data);
  } else {
    onError(new Error("Invalid data"));
  }
}

processData(
  myData,
  (result) => console.log("Success:", result),
  (error) => console.error("Error:", error)
);
```

##### **Pattern 2: Callback with Parameters**
```javascript
function calculate(a, b, operation) {
  const result = operation(a, b);
  console.log("Result:", result);
}

calculate(5, 3, (x, y) => x + y);  // Addition
calculate(5, 3, (x, y) => x * y);  // Multiplication
```

##### **Pattern 3: Chaining Callbacks**
```javascript
function step1(callback) {
  console.log("Step 1 complete");
  callback(step2);
}

function step2(callback) {
  console.log("Step 2 complete");
  callback(step3);
}

function step3() {
  console.log("Step 3 complete - All done!");
}

step1(next => next());
```

---

#### **Real-World Examples:**

**Example 1: User Registration Flow**
```javascript
function registerUser(userData, callback) {
  // Save to database
  saveToDatabase(userData, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      // Send welcome email
      sendEmail(user.email, () => {
        callback(null, user);  // Success!
      });
    }
  });
}
```

**Example 2: Image Processing**
```javascript
function processImage(imagePath, callback) {
  loadImage(imagePath, (img) => {
    resize(img, 800, 600, (resized) => {
      applyFilter(resized, 'grayscale', (filtered) => {
        save(filtered, (savedPath) => {
          callback(savedPath);  // Final result
        });
      });
    });
  });
}
```

**Example 3: Data Fetching with Fallback**
```javascript
function fetchData(url, callback) {
  fetch(url, (data) => {
    if (data) {
      callback(data);
    } else {
      // Try backup source
      fetchBackup(url, (backupData) => {
        callback(backupData);
      });
    }
  });
}
```

---

#### **The "Callback Hell" Problem:**

When you nest too many callbacks, code becomes hard to read:

```javascript
// Callback Hell (Pyramid of Doom)
getData((data) => {
  process(data, (result) => {
    save(result, (saved) => {
      notify(saved, (notification) => {
        log(notification, (logged) => {
          console.log("All done!");
        });
      });
    });
  });
});
```

**Solutions:**
1. **Named functions** (break into pieces)
2. **Promises** (Chapter 6)
3. **Async/Await** (Chapter 7)

---

#### **Best Practices for Callbacks:**

✅ **Use clear names:**
```javascript
// Bad
doSomething(data, cb => cb());

// Good
processUserData(user, (error, result) => {
  if (error) handleError(error);
  else displayResult(result);
});
```

✅ **Handle errors:**
```javascript
function safeOperation(callback) {
  try {
    // Do something
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}
```

✅ **Keep callbacks small:**
If your callback is too long, extract it into a named function.

✅ **Document expected parameters:**
```javascript
/**
 * @param {string} name - User's name
 * @param {function} callback - Called with (greeting) when complete
 */
function greet(name, callback) {
  callback(`Hello, ${name}`);
}
```

---

#### **Exercise: Test Your Understanding**

What's the output?

```javascript
function first(callback) {
  console.log("First");
  callback();
}

function second() {
  console.log("Second");
}

function third() {
  console.log("Third");
}

first(() => {
  second();
  third();
});
```

**Answer:**
```
First
Second
Third
```

---

---

## Chapter 6: Promises - Taming Async Code

### 🎯 Learning Objectives
- Understand what Promises are and why we need them
- Learn the three states of a Promise
- Master creating and using Promises
- Understand Promise chaining with `.then()` and `.catch()`
- Learn error handling in Promises
- See how Promises solve callback hell

### 💻 Code Example

**File: `index.js`**
```javascript
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

console.log("promise Lecture Starts");
delay(2000).then(() => {
  console.log("After 2 seconds Promise Resolved");
});
console.log("End");

function myDivide(num1, num2) {
  return new Promise((res, rej) => {
    if (num2 === 0) {
      rej("Can not divide it br,sorry");
    } else {
      res(num1 / num2);
    }
  });
}

myDivide(10, 5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

myDivide(10, 0)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

### 📝 Explanation

#### **Why Do We Need Promises?**

Remember callback hell from Chapter 3 and 5?

```javascript
// Callback Hell - Hard to read!
fs.readFile('file1.txt', (err, data1) => {
  if (err) throw err;
  fs.readFile('file2.txt', (err, data2) => {
    if (err) throw err;
    fs.readFile('file3.txt', (err, data3) => {
      if (err) throw err;
      console.log(data1, data2, data3);
    });
  });
});
```

**Problems:**
- Deeply nested code (pyramid shape)
- Hard to read and maintain
- Error handling at every level
- Difficult to debug

**Promises fix all these issues!**

---

#### **What Exactly is a Promise?**

A **Promise** is like a real-life promise:
- You promise to do something NOW or LATER
- Either you KEEP the promise (fulfill it)
- Or you BREAK the promise (reject it)
- While waiting, the promise is PENDING

**Technical definition:**
A Promise is a JavaScript object that represents:
- An asynchronous operation that will complete in the FUTURE
- The RESULT of that operation (success or failure)

**Real-life analogy:**

Restaurant order:
```
You order food → Promise is created
Kitchen prepares → Promise is PENDING
Food arrives → Promise is RESOLVED (fulfilled)
OR
They're out of ingredients → Promise is REJECTED
```

---

#### **The Three States of a Promise:**

Every Promise goes through these states:

```
     PENDING
        ↓
       / \
      /   \
     ↓     ↓
RESOLVED  REJECTED
(Fulfilled)
```

**1. Pending:**
- Initial state
- Not yet completed
- Still working on it
- Like "cooking in progress"

**2. Resolved (Fulfilled):**
- Operation succeeded
- Has a result value
- Like "food is ready!"

**3. Rejected:**
- Operation failed
- Has an error reason
- Like "sorry, we're out of stock"

**Important:** Once resolved or rejected, a Promise is SETTLED and cannot change state again!

---

#### **Detailed Breakdown:**

##### **Part 1: Creating a Simple Delay Promise**

```javascript
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
```

**Breaking it down:**

**Function declaration:**
- `delay` is a function that takes `time` parameter (in milliseconds)
- Returns a Promise object

**Inside the function:**
```javascript
return new Promise((resolve, reject) => {
  setTimeout(resolve, time);
});
```

**`new Promise(...)`**:
- Creates a brand new Promise object
- Takes a function (called executor function)
- This function runs automatically when Promise is created

**Executor function parameters:**
1. **`resolve`**: A function to call when operation SUCCEEDS
2. **`reject`**: A function to call when operation FAILS

**`setTimeout(resolve, time)`**:
- Waits for `time` milliseconds
- Then calls `resolve()` (marks Promise as fulfilled)
- No value passed to resolve, just signals completion

**What this does:**
Returns a Promise that waits for specified time, then completes successfully.

---

##### **Part 2: Using the Delay Promise**

```javascript
console.log("promise Lecture Starts");
delay(2000).then(() => {
  console.log("After 2 seconds Promise Resolved");
});
console.log("End");
```

**Line-by-line execution:**

**Line 1:** `console.log("promise Lecture Starts");`
- Runs IMMEDIATELY
- Output: `"promise Lecture Starts"`

**Line 2:** `delay(2000).then(...)`
- Calls `delay(2000)` which returns a Promise
- Promise starts in PENDING state
- Timer starts counting (2 seconds)
- `.then()` attaches a callback to run when Promise RESOLVES
- JavaScript DOESN'T WAIT - moves to next line immediately!

**Line 3:** `console.log("End");`
- Runs IMMEDIATELY (doesn't wait for the 2-second timer!)
- Output: `"End"`

**Meanwhile... (after 2 seconds):**
- Timer finishes
- Promise calls `resolve()`
- State changes from PENDING → RESOLVED
- `.then()` callback fires
- Output: `"After 2 seconds Promise Resolved"`

**Complete output:**
```
promise Lecture Starts
End
After 2 seconds Promise Resolved
```

**Notice the order!** "End" appears BEFORE "After 2 seconds" because Promises don't block code execution.

---

##### **Part 3: Understanding `.then()`**

**Syntax:**
```javascript
promise.then(successCallback);
```

**What it does:**
- Registers a function to run when Promise resolves
- Receives the resolved value as parameter
- Returns a NEW Promise (allows chaining!)

**Example:**
```javascript
delay(2000).then(() => {
  console.log("Done!");
});
```

**Arrow function breakdown:**
```javascript
() => {
  console.log("Done!");
}
```
- `()` = no parameters
- `=>` = arrow function syntax
- `{ ... }` = function body

**Same with regular function:**
```javascript
delay(2000).then(function() {
  console.log("Done!");
});
```

---

##### **Part 4: Division Promise with Resolve/Reject**

```javascript
function myDivide(num1, num2) {
  return new Promise((res, rej) => {
    if (num2 === 0) {
      rej("Can not divide it br,sorry");
    } else {
      res(num1 / num2);
    }
  });
}
```

**Detailed explanation:**

**Parameters:**
- `num1` = numerator (top number)
- `num2` = denominator (bottom number)

**Inside the Promise:**

**Check for division by zero:**
```javascript
if (num2 === 0) {
  rej("Can not divide it br,sorry");
}
```
- If dividing by zero, call `rej()` (reject)
- Passes error message as string
- Promise becomes REJECTED

**Otherwise:**
```javascript
else {
  res(num1 / num2);
}
```
- Perform division: `num1 / num2`
- Call `res()` (resolve) with the result
- Promise becomes RESOLVED with the value

**Shorter parameter names:**
- `res` instead of `resolve`
- `rej` instead of `reject`
- Still work exactly the same!

---

##### **Part 5: Handling Success with `.then()`**

```javascript
myDivide(10, 5)
  .then((result) => console.log(result))
```

**Step-by-step:**

**Line 1:** `myDivide(10, 5)`
- Calls function with 10 ÷ 5
- Inside Promise: `num2` is 5 (not zero)
- Executes: `res(10 / 5)` = `res(2)`
- Promise RESOLVES with value `2`

**Line 2:** `.then((result) => console.log(result))`
- `.then()` receives the resolved value (2)
- Parameter `result` gets value `2`
- Executes: `console.log(2)`
- Output: `2`

**Result:** Prints `2`

---

##### **Part 6: Handling Errors with `.catch()`**

```javascript
myDivide(10, 0)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

**What happens:**

**Line 1:** `myDivide(10, 0)`
- Calls function with 10 ÷ 0
- Inside Promise: `num2` is 0
- Executes: `rej("Can not divide it br,sorry")`
- Promise REJECTS with error message

**Line 2:** `.then((result) => console.log(result))`
- Since Promise was REJECTED, `.then()` is SKIPPED
- Doesn't run the success callback
- Jumps straight to `.catch()`

**Line 3:** `.catch((err) => console.log(err))`
- `.catch()` handles rejected Promises
- Parameter `err` gets the rejection reason
- Executes: `console.log("Can not divide it br,sorry")`
- Output: `"Can not divide it br,sorry"`

**Result:** Prints error message

---

##### **Part 7: Promise Chaining**

```javascript
myDivide(10, 5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

**How chaining works:**

Each `.then()` or `.catch()` returns a NEW Promise, allowing you to chain multiple operations:

```javascript
doSomething()
  .then(result1 => {
    return doSomethingElse(result1);
  })
  .then(result2 => {
    return doThirdThing(result2);
  })
  .then(finalResult => {
    console.log("All done!", finalResult);
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  });
```

**Benefits:**
- Flat, readable code (no nesting!)
- Single error handler at the end
- Clear flow of data
- Easy to add more steps

---

#### **Creating Promises - Different Scenarios:**

##### **Scenario 1: Immediate Success**
```javascript
const successPromise = new Promise((resolve) => {
  resolve("Success!");
});

successPromise.then(msg => console.log(msg));
// Output: "Success!"
```

##### **Scenario 2: Immediate Failure**
```javascript
const failPromise = new Promise((resolve, reject) => {
  reject("Failed!");
});

failPromise.catch(err => console.log(err));
// Output: "Failed!"
```

##### **Scenario 3: Async Operation (API Call)**
```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

fetchData('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

##### **Scenario 4: File Reading**
```javascript
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFileAsync('file.txt')
  .then(content => console.log(content))
  .catch(err => console.error(err));
```

---

#### **Promise Methods You Should Know:**

##### **`Promise.resolve(value)`**
Creates an already-resolved Promise:
```javascript
Promise.resolve("Done").then(val => console.log(val));
// Output: "Done"
```

##### **`Promise.reject(reason)`**
Creates an already-rejected Promise:
```javascript
Promise.reject("Error").catch(err => console.log(err));
// Output: "Error"
```

##### **`Promise.all([promises])`**
Waits for ALL promises to resolve:
```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [1, 2, 3]
});
```

##### **`Promise.race([promises])`**
Returns first settled Promise:
```javascript
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 1000));
const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 100));

Promise.race([slow, fast]).then(val => {
  console.log(val); // "fast" (wins the race!)
});
```

---

#### **Error Handling Best Practices:**

✅ **Always add a `.catch()`**:
```javascript
myPromise
  .then(result => handle(result))
  .catch(err => console.error(err)); // Handle errors
```

✅ **Specific error handling**:
```javascript
fetchData()
  .then(data => processData(data))
  .catch(err => {
    if (err.code === 'NOT_FOUND') {
      console.log('Resource not found');
    } else if (err.code === 'NETWORK_ERROR') {
      console.log('Check your internet connection');
    } else {
      console.log('Unknown error:', err);
    }
  });
```

✅ **Throw errors in `.then()` chains**:
```javascript
getData()
  .then(data => {
    if (!data.isValid) {
      throw new Error('Invalid data'); // Triggers .catch()
    }
    return process(data);
  })
  .catch(err => console.error(err));
```

❌ **Don't ignore errors**:
```javascript
// BAD - silently swallows errors
myPromise.then(result => console.log(result));
// If promise rejects, you'll never know!
```

---

#### **Comparing: Callbacks vs Promises**

**Callbacks (Old Way):**
```javascript
getData(function(err, data) {
  if (err) {
    handleError(err);
  } else {
    processData(data, function(err, result) {
      if (err) {
        handleError(err);
      } else {
        saveData(result, function(err, saved) {
          if (err) handleError(err);
          else console.log(saved);
        });
      }
    });
  }
});
```

**Promises (Better Way):**
```javascript
getData()
  .then(data => processData(data))
  .then(result => saveData(result))
  .then(saved => console.log(saved))
  .catch(err => handleError(err));
```

**Advantages:**
- ✅ Flat structure (no pyramid!)
- ✅ Single error handler
- ✅ Clear data flow
- ✅ Easier to read and maintain
- ✅ Better composability

---

#### **Common Mistakes:**

❌ **Forgetting to return in `.then()`**:
```javascript
getData()
  .then(data => {
    processData(data); // Forgot return!
  })
  .then(result => {
    // result is undefined!
  });
```

✅ **Always return values**:
```javascript
getData()
  .then(data => {
    return processData(data); // Proper return
  })
  .then(result => {
    // result has processed data
  });
```

❌ **Using both callbacks and promises**:
```javascript
// BAD - confusing!
fs.readFile('file.txt', (err, data) => {
  return Promise.resolve(data);
});
```

✅ **Pick one approach**:
```javascript
// Use either callbacks OR promises, not both
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

❌ **Not handling rejections**:
```javascript
// BAD - unhandled rejection!
myPromise.then(result => console.log(result));
// If it rejects, your app might crash!
```

✅ **Always catch errors**:
```javascript
myPromise
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

---

#### **Complete Execution Flow:**

When you run the code:

```
START
  ↓
Define delay() function ✓
  ↓
Define myDivide() function ✓
  ↓
Execute: console.log("promise Lecture Starts")
  → Output: "promise Lecture Starts"
  ↓
Execute: delay(2000).then(...)
  → Creates Promise (PENDING)
  → Timer starts (2 seconds)
  → .then() registered
  → Continues WITHOUT waiting
  ↓
Execute: console.log("End")
  → Output: "End"
  ↓
[Time passes... 2 seconds...]
  ↓
Timer completes
  → Promise calls resolve()
  → State: PENDING → RESOLVED
  → .then() callback fires
  → Output: "After 2 seconds Promise Resolved"
  ↓
Execute: myDivide(10, 5).then(...).catch(...)
  → Creates Promise
  → 10 ÷ 5 = 2
  → Promise resolves with 2
  → .then() runs: console.log(2)
  → Output: 2
  ↓
Execute: myDivide(10, 0).then(...).catch(...)
  → Creates Promise
  → Division by zero detected
  → Promise rejects with error message
  → .then() skipped
  → .catch() runs: console.log(error)
  → Output: "Can not divide it br,sorry"
  ↓
END
```

**Final Output:**
```
promise Lecture Starts
End
2
After 2 seconds Promise Resolved
Can not divide it br,sorry
```

*(Note: Exact order may vary slightly based on timing, but "promise Lecture Starts" and "End" always come first)*

---

#### **Real-World Applications:**

Promises are used everywhere in modern JavaScript:

1. **API Requests** (Fetch API):
```javascript
fetch('https://api.github.com/users/octocat')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

2. **Database Operations**:
```javascript
db.connect()
  .then(() => db.query('SELECT * FROM users'))
  .then(results => console.log(results))
  .catch(err => console.error(err));
```

3. **File Operations**:
```javascript
readFileAsync('input.txt')
  .then(content => writeFileAsync('output.txt', content))
  .then(() => console.log('File copied!'))
  .catch(err => console.error(err));
```

4. **Authentication**:
```javascript
login(username, password)
  .then(token => saveToken(token))
  .then(() => redirectToDashboard())
  .catch(err => showErrorMessage(err));
```

5. **Multiple Parallel Requests**:
```javascript
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]).then(([users, posts, comments]) => {
  // All data loaded, render page
});
```

---

#### **Exercise: Predict the Output**

What's the output?

```javascript
const promise = new Promise((resolve, reject) => {
  console.log("1. Promise created");
  resolve("Success");
  console.log("2. After resolve");
});

promise.then(val => console.log("3.", val));
console.log("4. After .then()");
```

**Answer:**
```
1. Promise created
2. After resolve
4. After .then()
3. Success
```

**Explanation:** The `.then()` callback runs asynchronously, even though resolve was called immediately!

---

---

## Chapter 7: Async/Await - Writing Elegant Async Code

### 🎯 Learning Objectives
- Understand what async/await is and why it was created
- Learn how to declare async functions
- Master the await keyword and how it works
- Handle errors in async functions with try-catch
- Convert Promise-based code to async/await
- Understand the advantages over .then() chains

### 💻 Complete Example

**File: `index.js`**
```javascript
// Async/Await example building on Promises

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function processData() {
  console.log("Starting process...");
  
  await delay(2000);
  console.log("After 2 seconds - first delay done");
  
  await delay(1000);
  console.log("After 1 more second - second delay done");
  
  const result = await divideNumbers(10, 5);
  console.log("Division result:", result);
  
  try {
    const errorResult = await divideNumbers(10, 0);
    console.log("This won't print:", errorResult);
  } catch (error) {
    console.log("Caught error:", error);
  }
  
  return "All operations completed!";
}

async function divideNumbers(num1, num2) {
  if (num2 === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return num1 / num2;
}

processData()
  .then(finalMessage => console.log(finalMessage))
  .catch(err => console.error(err));
```

### 📝 Detailed Explanation

#### **What is Async/Await?**

**Async/Await** is modern JavaScript syntax (ES2017) that makes asynchronous code look and behave like synchronous code.

**It's built on top of Promises!**

Think of it as a cleaner, more readable way to work with Promises.

**Real-life analogy:**

Making breakfast:

**With Promises (old way):**
```javascript
makeCoffee()
  .then(coffee => {
    console.log("Coffee ready");
    return makeToast();
  })
  .then(toast => {
    console.log("Toast ready");
    return fryEggs();
  })
  .then(eggs => {
    console.log("Eggs ready");
    console.log("Breakfast complete!");
  });
```

**With Async/Await (new way):**
```javascript
async function makeBreakfast() {
  const coffee = await makeCoffee();
  console.log("Coffee ready");
  
  const toast = await makeToast();
  console.log("Toast ready");
  
  const eggs = await fryEggs();
  console.log("Eggs ready");
  
  console.log("Breakfast complete!");
}
```

Which is easier to read? The async/await version! It reads like a normal recipe.

---

#### **Understanding the `async` Keyword**

##### **What does `async` do?**

Placing `async` before a function automatically makes it return a Promise.

**Simple example:**
```javascript
async function greet() {
  return "Hello!";
}

greet().then(message => console.log(message));
// Output: "Hello!"
```

**Behind the scenes:**
```javascript
async function greet() {
  return "Hello!";
}

// Is automatically converted to:
function greet() {
  return Promise.resolve("Hello!");
}
```

**Key points about `async`:**

1. **Always returns a Promise:**
```javascript
async function test() {
  return 42;
}

test().then(result => console.log(result)); // 42
```

2. **Can return complex objects:**
```javascript
async function getUser() {
  return {
    name: "John",
    age: 30
  };
}

getUser().then(user => console.log(user.name)); // "John"
```

3. **If you throw an error, Promise rejects:**
```javascript
async function fail() {
  throw new Error("Something went wrong");
}

fail().catch(err => console.error(err)); // Shows error
```

---

#### **Understanding the `await` Keyword**

##### **What does `await` do?**

The `await` keyword can ONLY be used inside `async` functions.

It pauses execution until the Promise settles (resolves or rejects).

**How it works:**

```javascript
async function myFunction() {
  const result = await somePromise();
  console.log(result);
  // Code continues here AFTER promise resolves
}
```

**Step-by-step:**

1. JavaScript sees `await somePromise()`
2. Waits for the Promise to resolve
3. Gets the resolved value
4. Stores it in `result` variable
5. Continues to next line

**Time visualization:**

```javascript
async function demo() {
  console.log("1. Before await");
  
  await delay(2000); // Wait 2 seconds
  
  console.log("2. After await (2 seconds later)");
}
```

**Output:**
```
1. Before await
(wait 2 seconds...)
2. After await (2 seconds later)
```

**Without `await`, this would print both immediately!**

---

#### **Detailed Breakdown of Our Example:**

##### **Part 1: Helper Functions**

```javascript
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
```

This is a regular function (not async) that returns a Promise.
We'll use this to create delays in our async code.

---

##### **Part 2: Declaring an Async Function**

```javascript
async function processData() {
  // ... code here
}
```

**What happens:**
- `async` keyword marks this function as asynchronous
- Function automatically returns a Promise
- Can use `await` inside this function
- When called, returns a Promise that resolves when function completes

---

##### **Part 3: Using `await` with Delays**

```javascript
async function processData() {
  console.log("Starting process...");
  
  await delay(2000);
  console.log("After 2 seconds - first delay done");
  
  await delay(1000);
  console.log("After 1 more second - second delay done");
}
```

**Execution flow:**

1. Prints: `"Starting process..."`
2. Hits `await delay(2000)`
3. **PAUSES** for 2 seconds
4. Delay Promise resolves
5. Continues to next line
6. Prints: `"After 2 seconds - first delay done"`
7. Hits `await delay(1000)`
8. **PAUSES** for 1 second
9. Delay Promise resolves
10. Continues
11. Prints: `"After 1 more second - second delay done"`

**Total time:** 3 seconds

**Without `await`:**
```javascript
delay(2000);
console.log("This prints immediately!"); // BAD!
```

**With `await`:**
```javascript
await delay(2000);
console.log("This waits 2 seconds first!"); // GOOD!
```

---

##### **Part 4: Awaiting Custom Promises**

```javascript
const result = await divideNumbers(10, 5);
console.log("Division result:", result);
```

**What happens:**

1. Calls `divideNumbers(10, 5)`
2. Returns a Promise
3. `await` waits for Promise to resolve
4. Gets the result (which is `2`)
5. Stores in `result` variable
6. Prints: `"Division result: 2"`

**Compare to Promise version:**

**Old way (Promises):**
```javascript
divideNumbers(10, 5)
  .then(result => {
    console.log("Division result:", result);
  });
```

**New way (Async/Await):**
```javascript
const result = await divideNumbers(10, 5);
console.log("Division result:", result);
```

Much cleaner and more readable!

---

##### **Part 5: Error Handling with Try-Catch**

```javascript
try {
  const errorResult = await divideNumbers(10, 0);
  console.log("This won't print:", errorResult);
} catch (error) {
  console.log("Caught error:", error);
}
```

**Why try-catch?**

When using `await`, if the Promise rejects, it throws an error.
We need try-catch to handle it gracefully.

**Step-by-step:**

1. Enters `try` block
2. Calls `await divideNumbers(10, 0)`
3. Inside `divideNumbers`: checks if `num2 === 0` → true
4. Throws error: `"Cannot divide by zero!"`
5. Promise rejects
6. `await` sees rejection → throws error
7. Jumps to `catch` block
8. Error stored in `error` variable
9. Executes: `console.log("Caught error:", error)`
10. Never executes the failed line's next statement

**Output:**
```
Caught error: Error: Cannot divide by zero!
```

---

##### **Part 6: Creating Async Functions That Throw Errors**

```javascript
async function divideNumbers(num1, num2) {
  if (num2 === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return num1 / num2;
}
```

**What's happening:**

- Function is marked `async` → automatically returns Promise
- If `num2` is 0, throws error
- `throw new Error()` creates an error object
- In async functions, thrown errors automatically reject the Promise
- If successful, returns the division result
- Return value automatically wrapped in resolved Promise

**Calling this function:**

```javascript
// Success case
const result = await divideNumbers(10, 5);
console.log(result); // 2

// Failure case
try {
  await divideNumbers(10, 0);
} catch (error) {
  console.log(error.message); // "Cannot divide by zero!"
}
```

---

##### **Part 7: Calling Async Functions**

```javascript
processData()
  .then(finalMessage => console.log(finalMessage))
  .catch(err => console.error(err));
```

**Why `.then()` at the end?**

Remember: `async` functions always return a Promise!

So `processData()` returns a Promise that resolves when the function completes.

We can use `.then()` to get the final result:

```javascript
processData().then(message => {
  console.log("Complete:", message);
});
```

Or we can await it in another async function:

```javascript
async function main() {
  const message = await processData();
  console.log("Complete:", message);
}
```

---

#### **Converting Promise Chains to Async/Await**

**Before (Promise chain):**
```javascript
function getData() {
  return fetchUser()
    .then(user => {
      return fetchPosts(user.id)
        .then(posts => {
          return fetchComments(posts[0].id)
            .then(comments => {
              return { user, posts, comments };
            });
        });
    })
    .catch(err => console.error(err));
}
```

**After (Async/Await):**
```javascript
async function getData() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, comments };
  } catch (err) {
    console.error(err);
  }
}
```

**Benefits:**
- ✅ Reads top-to-bottom
- ✅ No nesting
- ✅ Easier to debug
- ✅ Simpler error handling
- ✅ Looks like synchronous code

---

#### **Multiple Async Operations**

##### **Sequential (One after another):**

```javascript
async function sequential() {
  const user = await getUser();      // Wait for user
  const posts = await getPosts();    // Then get posts
  const comments = await getComments(); // Then get comments
  return { user, posts, comments };
}
```

**Time taken:** User time + Posts time + Comments time

**Use when:** Each step depends on previous result

---

##### **Parallel (At the same time):**

```javascript
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);
  return { user, posts, comments };
}
```

**Time taken:** Maximum of the three (fastest!)

**Use when:** Operations don't depend on each other

**Example:**
```javascript
// Fetch independent data simultaneously
const [users, products, orders] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/products'),
  fetch('/api/orders')
]);
```

---

#### **Error Handling Patterns**

##### **Pattern 1: Try-Catch Block**

```javascript
async function fetchData() {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
```

---

##### **Pattern 2: Multiple Try-Catch**

```javascript
async function complexOperation() {
  try {
    const user = await getUser();
    
    try {
      const posts = await getPosts(user.id);
      return posts;
    } catch (postError) {
      console.error("Post error:", postError);
      return [];
    }
    
  } catch (userError) {
    console.error("User error:", userError);
    throw userError; // Re-throw
  }
}
```

---

##### **Pattern 3: Global Error Handler**

```javascript
async function handler(req, res) {
  try {
    const data = await processData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

#### **Common Mistakes:**

❌ **Using await outside async function:**
```javascript
const result = await fetchData(); // ERROR!
```

✅ **Wrap in async function:**
```javascript
async function getData() {
  const result = await fetchData();
}
```

---

❌ **Forgetting await (gets Promise instead of value):**
```javascript
async function getData() {
  const result = fetchData(); // Forgot await!
  console.log(result); // Logs Promise object, not data!
}
```

✅ **Add await:**
```javascript
async function getData() {
  const result = await fetchData(); // Correct!
  console.log(result); // Logs actual data
}
```

---

❌ **Not handling errors:**
```javascript
async function riskyOperation() {
  const data = await fetchData(); // Might reject!
  return data;
}
```

✅ **Use try-catch:**
```javascript
async function riskyOperation() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

❌ **Unnecessary sequential awaits:**
```javascript
async function getAll() {
  const user = await getUser();     // Wait
  const posts = await getPosts();   // Wait
  const comments = await getComments(); // Wait
  // Total time = sum of all three!
}
```

✅ **Parallel when possible:**
```javascript
async function getAll() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);
  // Total time = longest one only!
}
```

---

#### **Complete Execution Flow:**

```
START
  ↓
Define delay() function ✓
  ↓
Define processData() as async ✓
  ↓
Define divideNumbers() as async ✓
  ↓
Call processData()
  → Returns Promise (PENDING)
  → Starts executing function body
  ↓
Inside processData():
  Print: "Starting process..."
  ↓
  await delay(2000)
  → PAUSES for 2 seconds
  ↓
  Print: "After 2 seconds - first delay done"
  ↓
  await delay(1000)
  → PAUSES for 1 second
  ↓
  Print: "After 1 more second - second delay done"
  ↓
  await divideNumbers(10, 5)
  → Calls function, waits for result
  → Returns 2
  ↓
  Print: "Division result: 2"
  ↓
  Enter try block
  ↓
  await divideNumbers(10, 0)
  → Throws error
  → Jump to catch block
  ↓
  Print: "Caught error: Cannot divide by zero!"
  ↓
  Return: "All operations completed!"
  → Promise RESOLVES with this value
  ↓
.then() receives: "All operations completed!"
  ↓
Print: "All operations completed!"
  ↓
END
```

**Final Output:**
```
Starting process...
After 2 seconds - first delay done
After 1 more second - second delay done
Division result: 2
Caught error: Cannot divide by zero!
All operations completed!
```

---

#### **When to Use Async/Await vs Promises:**

**Use Async/Await when:**
- ✅ Writing new asynchronous code
- ✅ Chaining multiple Promises
- ✅ Need better readability
- ✅ Complex error handling needed
- ✅ Debugging (easier with debugger)

**Stick with Promises when:**
- ✅ Simple single operation
- ✅ Need Promise.all() for parallel ops
- ✅ Working with older code
- ✅ API already returns Promises

---

#### **Real-World Examples:**

**Example 1: API Call Chain**
```javascript
async function getUserProfile(userId) {
  try {
    const user = await fetch(`/api/users/${userId}`);
    const userData = await user.json();
    
    const posts = await fetch(`/api/posts?userId=${userId}`);
    const postsData = await posts.json();
    
    return {
      ...userData,
      posts: postsData
    };
  } catch (error) {
    console.error('Failed to load profile:', error);
    throw error;
  }
}
```

**Example 2: File Processing**
```javascript
async function processFiles() {
  const files = ['file1.txt', 'file2.txt', 'file3.txt'];
  
  for (const file of files) {
    const content = await readFileAsync(file);
    const processed = await transformData(content);
    await writeFileAsync(`output_${file}`, processed);
    console.log(`Processed ${file}`);
  }
}
```

**Example 3: Database Transaction**
```javascript
async function createUser(userData) {
  const connection = await db.connect();
  
  try {
    await connection.beginTransaction();
    
    const user = await connection.query(
      'INSERT INTO users SET ?', 
      userData
    );
    
    await connection.query(
      'INSERT INTO logs SET ?', 
      { action: 'user_created', userId: user.id }
    );
    
    await connection.commit();
    return user;
    
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
```

---

#### **Performance Tips:**

**Tip 1: Parallelize Independent Operations**
```javascript
// SLOW - Sequential
async function slow() {
  const users = await getUsers();      // 500ms
  const posts = await getPosts();      // 300ms
  const comments = await getComments(); // 200ms
  // Total: 1000ms
}

// FAST - Parallel
async function fast() {
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments()
  ]);
  // Total: 500ms (longest operation)
}
```

**Tip 2: Don't Await Unnecessarily**
```javascript
// Unnecessary await
async function example1() {
  const result = await someAsyncOp();
  return result;
}

// Better - just return the Promise
async function example2() {
  return someAsyncOp();
}
```

---

#### **Debugging Async/Await:**

You can use standard debugging tools:

```javascript
async function debugMe() {
  try {
    debugger; // Pause point
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

In browser DevTools or VS Code debugger, execution pauses at `debugger` statement, even inside async functions!

---

---

## Chapter 8: Event Emitters

### 🎯 Learning Objectives
- Understand what events are in Node.js
- Learn the Observer design pattern
- Master EventEmitter class and its methods
- Understand event-driven architecture
- Learn how to create custom events
- Know when to use events vs callbacks

### 💻 Complete Example

**File: `index.js`**
```javascript
const EventEmitter = require('events');
const myFirstEmitter = new EventEmitter();

// Register an event listener
myFirstEmitter.on('greet', name => {
  console.log(`Hello ${name}`);
});

// Emit the event
myFirstEmitter.emit('greet', 'Abhishek Singh');

// Multiple listeners for same event
myFirstEmitter.on('greet', name => {
  console.log(`Good morning, ${name}!`);
});

// Emit again - both listeners will run
myFirstEmitter.emit('greet', 'Sarah');

// Remove a listener
myFirstEmitter.off('greet');

// This won't run - listeners removed
myFirstEmitter.emit('greet', 'John');
```

### 📝 Comprehensive Explanation

#### **What are Events?**

In programming, an **event** is something that happens that your code should respond to.

**Real-life examples:**
- Clicking a button → "click" event
- Receiving an email → "new message" event  
- Finishing downloading a file → "download complete" event
- User typing → "keypress" event

**In Node.js:**
Events are actions or occurrences that happen during program execution, and you can write code to respond to them.

---

#### **What is EventEmitter?**

**EventEmitter** is a built-in Node.js class that helps you create and handle custom events.

Think of it like a radio station:
- **Radio station** = EventEmitter
- **Listeners/Subscribers** = People tuned to the radio frequency
- **Broadcast** = Emitting an event
- **Message** = Arguments passed with the event

When the station broadcasts, everyone listening hears it!

---

#### **The Observer Pattern**

EventEmitter implements the **Observer Pattern**:

**Components:**
1. **Subject (EventEmitter)**: The object being observed
2. **Observers (Listeners)**: Functions that wait for events
3. **Events**: What the subject emits

**How it works:**
```
     [EventEmitter]
          |
          |--- Listens for: 'greet'
          |    Callback: (name) => console.log(...)
          |
          |--- Listens for: 'data'
          |    Callback: (data) => process(data)
          |
          ↓
     Emits: 'greet', 'Abhishek'
          ↓
     All 'greet' listeners run!
```

---

#### **Detailed Breakdown:**

##### **Part 1: Importing EventEmitter**

```javascript
const EventEmitter = require('events');
```

**Explanation:**
- `require('events')` loads the built-in events module
- Returns the EventEmitter class
- Store in variable for creating instances

**Note:** Notice lowercase `'events'` (module name) vs uppercase `EventEmitter` (class name)

---

##### **Part 2: Creating an EventEmitter Instance**

```javascript
const myFirstEmitter = new EventEmitter();
```

**Breaking it down:**
- `new EventEmitter()` creates a fresh EventEmitter object
- Like creating a new radio station
- Each instance has its own set of events and listeners
- Stored in `myFirstEmitter` variable

**Why `new` keyword?**
- EventEmitter is a constructor function (class)
- `new` creates a new instance/object
- Similar to: `new Array()`, `new Date()`

---

##### **Part 3: Registering Event Listeners with `.on()`**

```javascript
myFirstEmitter.on('greet', name => {
  console.log(`Hello ${name}`);
});
```

**Syntax:**
```javascript
emitter.on(eventName, callbackFunction);
```

**Parameters:**

1. **`'greet'`** (Event Name):
   - String identifier for the event
   - Can be any string: `'click'`, `'data'`, `'user:login'`, etc.
   - Convention: Use camelCase or colon-separated names
   - Case-sensitive: `'Greet'` ≠ `'greet'`

2. **`name => { ... }`** (Listener/Callback):
   - Function that runs when event is emitted
   - Receives arguments passed to `emit()`
   - Can be arrow function, regular function, or named function

**Alternative syntax:**
```javascript
// Named function
function greetListener(name) {
  console.log(`Hello ${name}`);
}
myFirstEmitter.on('greet', greetListener);

// Regular anonymous function
myFirstEmitter.on('greet', function(name) {
  console.log(`Hello ${name}`);
});

// Arrow function (what we used)
myFirstEmitter.on('greet', name => {
  console.log(`Hello ${name}`);
});
```

**What happens internally:**
- EventEmitter stores this listener in its internal list
- Creates a mapping: `'greet'` → `[listener1]`
- Waits for the event to be emitted
- Doesn't execute yet! Just registers interest.

---

##### **Part 4: Emitting Events with `.emit()`**

```javascript
myFirstEmitter.emit('greet', 'Abhishek Singh');
```

**Syntax:**
```javascript
emitter.emit(eventName, ...arguments);
```

**Parameters:**

1. **`'greet'`**: Which event to emit
2. **`'Abhishek Singh'`**: Data to pass to listeners (can have multiple arguments)

**What happens step-by-step:**

1. Look up all listeners registered for `'greet'`
2. Find one listener: `name => { console.log(...) }`
3. Call that listener with argument: `'Abhishek Singh'`
4. Listener executes: `console.log(\`Hello Abhishek Singh\`)`
5. Output: `"Hello Abhishek Singh"`

**Passing multiple arguments:**
```javascript
// Register with multiple parameters
myFirstEmitter.on('userData', (name, age, city) => {
  console.log(`${name}, ${age}, from ${city}`);
});

// Emit with matching arguments
myFirstEmitter.emit('userData', 'John', 25, 'New York');
// Output: "John, 25, from New York"
```

---

##### **Part 5: Multiple Listeners for Same Event**

```javascript
// First listener
myFirstEmitter.on('greet', name => {
  console.log(`Hello ${name}`);
});

// Second listener for SAME event
myFirstEmitter.on('greet', name => {
  console.log(`Good morning, ${name}!`);
});

// Emit once
myFirstEmitter.emit('greet', 'Sarah');
```

**Output:**
```
Hello Sarah
Good morning, Sarah!
```

**Key points:**
- Multiple listeners can exist for same event
- All listeners run when event is emitted
- Listeners run in order they were added
- Single `emit()` triggers ALL listeners

**Use case:**
```javascript
// Different modules listen to same event
emitter.on('user:login', logActivity);
emitter.on('user:login', sendWelcomeEmail);
emitter.on('user:login', updateLastLoginTime);

// One emit triggers all three functions!
emitter.emit('user:login', userId);
```

---

##### **Part 6: Removing Listeners with `.off()`**

```javascript
// Remove specific listener
myFirstEmitter.off('greet');

// Or remove specific function reference
function myListener(name) {
  console.log(`Hi ${name}`);
}
myFirstEmitter.on('greet', myListener);
myFirstEmitter.off('greet', myListener); // Remove just this one
```

**After removing:**
```javascript
myFirstEmitter.emit('greet', 'John');
// Nothing happens - no listeners!
```

**Other removal methods:**
```javascript
// Remove all listeners for specific event
emitter.removeAllListeners('greet');

// Remove ALL listeners for ALL events
emitter.removeAllListeners();

// Remove first listener only
emitter.removeListener('greet', firstListener);
```

**Why remove listeners?**
- Prevent memory leaks
- Stop outdated handlers
- Clean up when components unmount/destroy

---

#### **EventEmitter Methods Reference:**

| Method | Description | Example |
|--------|-------------|---------|
| `.on(event, listener)` | Add listener | `emitter.on('click', handler)` |
| `.once(event, listener)` | Listen once, then auto-remove | `emitter.once('init', initHandler)` |
| `.emit(event, ...args)` | Trigger event | `emitter.emit('data', value)` |
| `.off(event, listener)` | Remove listener | `emitter.off('click', handler)` |
| `.removeAllListeners(event)` | Remove all listeners | `emitter.removeAllListeners('click')` |
| `.listeners(event)` | Get array of listeners | `emitter.listeners('click')` |
| `.listenerCount(event)` | Count listeners | `emitter.listenerCount('click')` |

---

#### **Special Event Types:**

##### **1. Regular Events**
```javascript
emitter.on('data', data => {
  console.log(data);
});
emitter.emit('data', 'Hello');
```

##### **2. One-Time Events (`.once()`)**
```javascript
emitter.once('startup', () => {
  console.log('This runs only once!');
});

emitter.emit('startup'); // Runs ✓
emitter.emit('startup'); // Does nothing ✗
```

**Use case:** Initialization code that should run once

##### **3. Error Events**
```javascript
emitter.on('error', err => {
  console.error('Error occurred:', err);
});

emitter.emit('error', new Error('Something broke!'));
```

**Special:** If no error listener exists and error is emitted, Node.js crashes!

---

#### **Creating a Custom EventEmitter Class**

You can extend EventEmitter to create specialized event handlers:

```javascript
const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  constructor(roomName) {
    super();
    this.roomName = roomName;
  }
  
  sendMessage(user, message) {
    console.log(`[${this.roomName}] ${user}: ${message}`);
    this.emit('message', { user, message, time: Date.now() });
  }
  
  join(user) {
    console.log(`${user} joined ${this.roomName}`);
    this.emit('userJoined', user);
  }
}

// Usage
const chat = new ChatRoom('General');

chat.on('message', data => {
  console.log(`New message at ${data.time}: ${data.message}`);
});

chat.on('userJoined', user => {
  console.log(`Welcome ${user}!`);
});

chat.join('Alice');
chat.sendMessage('Bob', 'Hey everyone!');
```

**Output:**
```
Alice joined General
Welcome Alice!
[General] Bob: Hey everyone!
New message at 1234567890: Hey everyone!
```

---

#### **Real-World Examples:**

##### **Example 1: Progress Tracking**
```javascript
class FileDownloader extends EventEmitter {
  download(url) {
    let downloaded = 0;
    const total = 100;
    
    const interval = setInterval(() => {
      downloaded += 10;
      this.emit('progress', downloaded, total);
      
      if (downloaded >= total) {
        clearInterval(interval);
        this.emit('complete');
      }
    }, 1000);
  }
}

const downloader = new FileDownloader();

downloader.on('progress', (current, total) => {
  console.log(`Downloaded ${current}%`);
});

downloader.on('complete', () => {
  console.log('Download finished!');
});

downloader.download('file.zip');
```

##### **Example 2: Order Processing System**
```javascript
class OrderProcessor extends EventEmitter {
  processOrder(order) {
    this.emit('order:received', order);
    
    if (!this.validateOrder(order)) {
      this.emit('order:invalid', order);
      return;
    }
    
    this.emit('order:validated', order);
    this.chargePayment(order);
    this.emit('order:completed', order);
  }
  
  validateOrder(order) {
    return order.items && order.items.length > 0;
  }
  
  chargePayment(order) {
    // Payment logic here
  }
}

const processor = new OrderProcessor();

processor.on('order:received', order => {
  console.log('New order received:', order.id);
});

processor.on('order:validated', order => {
  console.log('Order validated:', order.id);
});

processor.on('order:completed', order => {
  console.log('Order completed:', order.id);
});

processor.processOrder({ id: 1, items: ['item1', 'item2'] });
```

##### **Example 3: Logger System**
```javascript
class Logger extends EventEmitter {
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    this.emit('log', { timestamp, message, level });
  }
  
  error(message) {
    this.log(message, 'error');
  }
  
  warn(message) {
    this.log(message, 'warn');
  }
}

const logger = new Logger();

logger.on('log', entry => {
  console.log(`[${entry.timestamp}] [${entry.level}]: ${entry.message}`);
});

logger.on('log', entry => {
  // Also save to file
  fs.appendFileSync('app.log', JSON.stringify(entry) + '\n');
});

logger.log('Application started');
logger.error('Database connection failed');
logger.warn('Low disk space');
```

---

#### **Event-Driven Architecture Benefits:**

✅ **Loose Coupling:**
- Components don't need to know about each other
- Just emit/listen to events
- Easy to add/remove features

✅ **Scalability:**
- Add new listeners without changing emitter code
- Multiple systems can react to same event

✅ **Maintainability:**
- Clear separation of concerns
- Each listener handles one responsibility
- Easy to debug and test

✅ **Flexibility:**
- Change behavior by adding/removing listeners
- No code changes to emitter needed

---

#### **Common Mistakes:**

❌ **Forgetting to handle errors:**
```javascript
// BAD - if error emitted with no listener, app crashes!
emitter.emit('error', new Error('Boom!'));
```

✅ **Always add error listener:**
```javascript
emitter.on('error', err => {
  console.error(err);
});
```

---

❌ **Memory leaks from not removing listeners:**
```javascript
// BAD - listener stays forever
function setup() {
  emitter.on('data', handler);
}
```

✅ **Clean up when done:**
```javascript
function setup() {
  emitter.on('data', handler);
  return () => emitter.off('data', handler);
}
```

---

❌ **Too many listeners warning:**
```javascript
// Adding 11+ listeners triggers warning
for (let i = 0; i < 20; i++) {
  emitter.on('test', handler);
}
// Warning: MaxListenersExceededWarning
```

✅ **Increase limit if needed:**
```javascript
emitter.setMaxListeners(50); // Allow more listeners
```

---

#### **Complete Execution Flow:**

```
START
  ↓
Import EventEmitter ✓
  ↓
Create instance: myFirstEmitter ✓
  ↓
Register first listener for 'greet'
  → Stores: greet → [listener1]
  ↓
Emit 'greet' with 'Abhishek Singh'
  → Finds listener1
  → Calls: listener1('Abhishek Singh')
  → Prints: "Hello Abhishek Singh"
  ↓
Register second listener for 'greet'
  → Stores: greet → [listener1, listener2]
  ↓
Emit 'greet' with 'Sarah'
  → Calls listener1('Sarah')
    → Prints: "Hello Sarah"
  → Calls listener2('Sarah')
    → Prints: "Good morning, Sarah!"
  ↓
Remove all 'greet' listeners
  → Clears: greet → []
  ↓
Emit 'greet' with 'John'
  → No listeners found
  → Nothing happens
  ↓
END
```

**Final Output:**
```
Hello Abhishek Singh
Hello Sarah
Good morning, Sarah!
```

---

#### **When to Use EventEmitter vs Callbacks:**

**Use EventEmitter when:**
- ✅ Multiple components need to respond to same event
- ✅ You don't know how many listeners there will be
- ✅ Building reusable libraries/components
- ✅ Implementing pub/sub pattern
- ✅ Handling streams of data

**Use Callbacks when:**
- ✅ Single response expected
- ✅ Simple one-time operations
- ✅ Passing result back to caller
- ✅ Traditional async operations

---

#### **Advanced Features:**

##### **Get All Listeners:**
```javascript
const listeners = emitter.listeners('greet');
console.log(listeners.length); // Number of listeners
```

##### **Check if Event Has Listeners:**
```javascript
if (emitter.listenerCount('greet') > 0) {
  emitter.emit('greet', 'Hello');
} else {
  console.log('No one is listening!');
}
```

##### **Set Maximum Listeners:**
```javascript
emitter.setMaxListeners(20); // Default is 10
```

##### **Prepend Listener (runs first):**
```javascript
emitter.prependListener('greet', firstHandler);
```

---

---

## Chapter 9: Express.js Fundamentals

### 🎯 Learning Objectives
- Understand what Express.js is and why we use it
- Learn how Express simplifies HTTP server creation
- Master routing in Express
- Understand middleware and how it works
- Learn about request and response objects
- Build your first Express application

### 💻 Complete Example

**Basic Express Server**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 📝 Comprehensive Explanation

#### **What is Express.js?**

**Express.js** is a minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications.

Think of it this way:
- **Node.js http module** = Building a house brick by brick (manual, detailed)
- **Express.js** = Pre-fabricated house components (fast, easy, structured)

**Why use Express?**

**Problems with raw http module:**
```javascript
// Raw Node.js - lots of manual work
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Handle home
  } else if (req.url === '/about' && req.method === 'GET') {
    // Handle about
  }
  // Need to manually check every route!
});
```

**Express solution:**
```javascript
// Express - clean and simple!
app.get('/', (req, res) => res.send('Home'));
app.get('/about', (req, res) => res.send('About'));
```

---

#### **Installing Express:**

```bash
npm install express
```

This downloads and installs Express into your project's `node_modules` folder.

---

#### **Detailed Breakdown:**

##### **Part 1: Importing and Initializing Express**

```javascript
const express = require('express');
const app = express();
```

**Line 1:** `const express = require('express');`
- Loads the Express module
- Returns the Express function

**Line 2:** `const app = express();`
- Calls the Express function
- Creates an Express application object
- This `app` object has all the methods you need
- Like creating a new server instance

**What is `app`?**
- An object with methods: `.get()`, `.post()`, `.use()`, `.listen()`
- Manages all your routes and middleware
- The heart of your Express application

---

##### **Part 2: Middleware - `app.use()`**

```javascript
app.use(express.json());
```

**What is Middleware?**

Middleware are functions that run BEFORE your route handlers.

**Real-life analogy:**
Think of a restaurant:
1. Security check (middleware 1)
2. Temperature check (middleware 2)
3. Host seats you (middleware 3)
4. Waiter takes order (route handler)

Each step processes you before you reach the final destination.

**In Express:**
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
           ↓              ↓                ↓
        Check auth     Parse JSON      Send response
```

**`express.json()` middleware:**
- Automatically parses JSON from request bodies
- Makes parsed data available as `req.body`
- Without this, `req.body` would be undefined

**Other built-in middleware:**
```javascript
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files
```

---

##### **Part 3: Creating Routes - `app.get()`**

```javascript
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
```

**Syntax:**
```javascript
app.METHOD(PATH, HANDLER)
```

**Parameters:**

1. **`'/'`** (Path):
   - URL pattern to match
   - `/` = home page
   - `/about` = /about page
   - `/users/:id` = dynamic parameter

2. **`(req, res) => { ... }`** (Handler):
   - Function that runs when someone visits this route
   - Receives `req` (request) and `res` (response) objects
   - Responsible for sending response

**HTTP Methods:**
- `app.get()` - For GET requests (fetching data)
- `app.post()` - For POST requests (creating data)
- `app.put()` - For PUT requests (updating data)
- `app.delete()` - For DELETE requests (deleting data)

---

##### **Part 4: Route Parameters**

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

**What are route parameters?**

Dynamic segments in your route path.

**How it works:**
- `:id` is a placeholder
- Matches any value in that position
- `/users/123` → `id = "123"`
- `/users/abc` → `id = "abc"`

**Accessing parameters:**
```javascript
req.params.id  // Gets the :id value
```

**Multiple parameters:**
```javascript
app.get('/users/:userId/posts/:postId', (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  res.send(`Post ${postId} by User ${userId}`);
});
```

---

##### **Part 5: Starting the Server**

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**What it does:**
- Starts the Express server
- Listens on specified port (3000)
- Callback runs when server is ready
- Similar to raw http module but simpler!

---

#### **More Routing Examples:**

##### **Query Parameters:**
```javascript
// Visit: /search?q=nodejs&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit;
  res.send(`Searching for "${query}", limit ${limit}`);
});
```

**Access with:** `req.query.propertyName`

---

##### **POST Request with Body:**
```javascript
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  console.log('New user:', name, email);
  res.status(201).send('User created!');
});
```

**Requires middleware:**
```javascript
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
```

---

##### **Sending Different Response Types:**

**Send HTML:**
```javascript
res.send('<h1>Hello World</h1>');
```

**Send JSON:**
```javascript
res.json({ message: 'Success', data: [1, 2, 3] });
```

**Send file:**
```javascript
res.sendFile(__dirname + '/index.html');
```

**Redirect:**
```javascript
res.redirect('/new-location');
```

**Set status code:**
```javascript
res.status(404).send('Not Found');
```

**Chain methods:**
```javascript
res.status(200).json({ success: true });
```

---

#### **Middleware Deep Dive:**

##### **Types of Middleware:**

**1. Application-level:**
```javascript
const myLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next(); // Pass to next middleware
};

app.use(myLogger);
```

**2. Router-level:**
```javascript
const router = express.Router();
router.use(authMiddleware);
router.get('/users', getUsersHandler);
app.use('/api', router);
```

**3. Built-in:**
```javascript
app.use(express.json());
app.use(express.static('public'));
```

**4. Third-party:**
```javascript
const morgan = require('morgan'); // Logging
const cors = require('cors');     // CORS support
app.use(morgan('dev'));
app.use(cors());
```

---

##### **Creating Custom Middleware:**

```javascript
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // IMPORTANT: Call next() to continue!
}

app.use(logger);
```

**Middleware signature:**
```javascript
function middlewareName(req, res, next) {
  // Do something
  next(); // Continue to next middleware/route
}
```

**Parameters:**
- `req` - Request object
- `res` - Response object  
- `next` - Function to call when done

**Without `next()`, request hangs forever!**

---

##### **Middleware Execution Order:**

```javascript
// Order matters! First added = first executed
app.use(logger);        // Runs first
app.use(auth);          // Runs second
app.get('/users',       // Runs last
  (req, res) => res.send('Users')
);
```

**Visual flow:**
```
Request
  ↓
logger middleware
  ↓
auth middleware  
  ↓
route handler
  ↓
Response
```

---

#### **Error Handling:**

##### **Basic Error Handling:**
```javascript
app.get('/error', (req, res) => {
  throw new Error('Something broke!');
});

// Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});
```

**Note:** Error middleware has 4 parameters `(err, req, res, next)` instead of 3.

---

##### **Async Error Handling:**
```javascript
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

---

#### **Complete Express App Structure:**

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 3, name });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

#### **Comparison: Express vs Raw HTTP**

| Feature | Raw HTTP Module | Express.js |
|---------|----------------|------------|
| Setup | Complex | Simple |
| Routing | Manual URL checking | Clean `app.get()`, `app.post()` |
| Parameters | Manual parsing | `req.params` |
| Middleware | Manual implementation | Built-in support |
| JSON parsing | Manual | `express.json()` |
| Static files | Manual | `express.static()` |
| Error handling | Manual | Built-in patterns |
| Code size | More lines | Less code |

**Example - Same functionality:**

**Raw HTTP:**
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end('Home');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200);
    res.end('About');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
```

**Express:**
```javascript
app.get('/', (req, res) => res.send('Home'));
app.get('/about', (req, res) => res.send('About'));
app.use((req, res) => res.status(404).send('Not Found'));
```

Express is much cleaner and easier to maintain!

---

#### **When to Use Express:**

✅ **Use Express when:**
- Building REST APIs
- Creating web applications
- Need routing and middleware
- Want faster development
- Building production apps

❌ **Don't need Express when:**
- Very simple server (single endpoint)
- Learning HTTP fundamentals
- Need maximum performance (raw is slightly faster)
- WebSocket-only applications

---

#### **Popular Express Packages:**

```bash
# Logging
npm install morgan

# Security
npm install helmet

# CORS
npm install cors

# Environment variables
npm install dotenv

# Validation
npm install joi

# Authentication
npm install passport

# File uploads
npm install multer
```

---

#### **Project Structure Best Practices:**

```
my-app/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # Route definitions
├── utils/           # Helper functions
├── app.js           # Express app setup
└── server.js        # Server entry point
```

**Example:**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
```

---

---

## Chapter 10: REST API Development

### 🎯 Learning Objectives
- Understand what REST APIs are and why they're important
- Learn REST architectural principles
- Master CRUD operations (Create, Read, Update, Delete)
- Implement proper HTTP methods and status codes
- Build a complete working REST API
- Learn API best practices and conventions

### 💻 Complete Working Example

**File: `app.js`**
```javascript
const express = require("express");
const app = express();

// Middleware - Parse JSON bodies
app.use(express.json());

// In-memory database (array of objects)
let books = [
  { id: "1", title: "Book 1" },
  { id: "2", title: "Book 2" },
  { id: "3", title: "Book 3" },
  { id: "4", title: "Book 4" },
];

// ============================================
// ROUTE 1: Welcome Message (Home Route)
// ============================================
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to our bookstore api",
    endpoints: {
      getAll: "GET /get",
      getOne: "GET /get/:id",
      create: "POST /add",
      update: "PUT /update/:id",
      delete: "DELETE /delete/:id"
    }
  });
});

// ============================================
// ROUTE 2: Get All Books (READ - Multiple)
// ============================================
app.get("/get", (req, res) => {
  // Send entire books array
  res.json(books);
});

// ============================================
// ROUTE 3: Get Single Book by ID (READ - One)
// ============================================
app.get("/get/:id", (req, res) => {
  // Find book with matching ID
  const book = books.find(item => item.id === req.params.id);
  
  if (book) {
    // Book found - send it with 200 OK status
    res.status(200).json(book);
  } else {
    // Book not found - send 404 Not Found
    res.status(404).json({ 
      message: "Book not available, try different Book ID." 
    });
  }
});

// ============================================
// ROUTE 4: Add New Book (CREATE)
// ============================================
app.post('/add', (request, response) => {
  // Create new book object
  const newBook = {
    // Generate random ID between 0-999
    id: Math.floor(Math.random() * 1000).toString(),
    // Auto-generate title based on current count
    title: `Book ${books.length + 1}`
  };
  
  // Add to books array
  books.push(newBook);
  
  // Send success response with created book
  response.status(200).json({
    data: newBook,
    message: `New Book added successfully`
  });
});

// ============================================
// ROUTE 5: Update Existing Book (UPDATE)
// ============================================
app.put('/update/:id', (request, response) => {
  // Find the book in array
  const findCurrentBook = books.find(book => 
    book.id === request.params.id
  );
  
  if (findCurrentBook) {
    // Book exists - update its title
    // Use request body's title OR keep existing one
    findCurrentBook.title = request.body.title || findCurrentBook.title;
    
    // Send success message
    response.status(200).json({
      message: `Book with id ${findCurrentBook.id} updated sucessfully`,
    });
  } else {
    // Book not found
    response.status(404).json({
      message: `Book with id ${findCurrentBook} is not aviable `,
    });
  }
});

// ============================================
// ROUTE 6: Delete Book (DELETE)
// ============================================
app.delete('/delete/:id', (request, response) => {
  const findId = request.params.id;
  
  // Filter out the book with matching ID
  const newBooksCollection = books.filter(book => 
    book.id !== findId
  );
  
  // Check if any book was removed
  if (newBooksCollection.length === books.length) {
    // No change = book not found
    return response.status(404).json({
      message: `There is no such book like that ! `,
      data: books
    });
  }
  
  // Update books array (remove deleted book)
  books = newBooksCollection;
  
  // Send success with updated list
  response.status(200).json({
    message: `The Book is deleted successfully`,
    data: books
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});
```

### 📝 Ultra-Detailed Explanation

#### **What is a REST API?**

**REST** = **RE**presentational **S**tate **T**ransfer

It's a set of rules/conventions for building web services that allow different applications to communicate with each other.

**Real-life analogy:**

Think of a restaurant:
- **You (Client)** = Browser/Mobile App
- **Waiter (API)** = REST API
- **Kitchen (Server/Database)** = Backend system

**How it works:**
1. You look at menu (available endpoints)
2. Tell waiter your order (send request)
3. Waiter takes order to kitchen (API forwards to server)
4. Kitchen prepares food (server processes)
5. Waiter brings food back (API returns response)

**REST API follows specific rules:**
- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Stateless (each request contains all needed info)
- Client-Server architecture
- Uniform interface (consistent URL structure)

---

#### **Understanding CRUD Operations:**

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete

These are the four basic operations for any persistent storage.

| Operation | HTTP Method | SQL Equivalent | Our Example |
|-----------|-------------|----------------|-------------|
| **C**reate | POST | INSERT | Add new book |
| **R**ead | GET | SELECT | Get book(s) |
| **U**pdate | PUT | UPDATE | Update book |
| **D**elete | DELETE | DELETE | Remove book |

---

#### **Detailed Route-by-Route Breakdown:**

---

##### **Route 1: Home/Welcome Route**

```javascript
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to our bookstore api",
    endpoints: { ... }
  });
});
```

**Purpose:**
- Entry point to your API
- Provides documentation/help
- Tells users what endpoints are available

**Why include endpoint list?**
- Good developer experience (DX)
- Like a menu card in restaurant
- Helps API consumers know what's available

**When someone visits:** `http://localhost:3000/`

**Response:**
```json
{
  "message": "Welcome to our bookstore api",
  "endpoints": {
    "getAll": "GET /get",
    "getOne": "GET /get/:id",
    "create": "POST /add",
    "update": "PUT /update/:id",
    "delete": "DELETE /delete/:id"
  }
}
```

---

##### **Route 2: Get All Books**

```javascript
app.get("/get", (req, res) => {
  res.json(books);
});
```

**Breakdown:**
- `app.get()` - Handles GET requests
- `"/get"` - URL path
- `(req, res) => { ... }` - Handler function

**What happens:**
1. User sends GET request to `/get`
2. Server accesses `books` array
3. Sends entire array as JSON response
4. Automatically sets `Content-Type: application/json`

**Request:**
```
GET http://localhost:3000/get
```

**Response:**
```json
[
  { "id": "1", "title": "Book 1" },
  { "id": "2", "title": "Book 2" },
  { "id": "3", "title": "Book 3" },
  { "id": "4", "title": "Book 4" }
]
```

**Status:** `200 OK` (default)

---

##### **Route 3: Get Single Book by ID**

```javascript
app.get("/get/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not available..." });
  }
});
```

**Breaking it down:**

**Route Path:** `"/get/:id"`
- `:id` is a route parameter (dynamic)
- Matches: `/get/1`, `/get/abc`, `/get/anything`
- The value after `/get/` is captured

**Finding the book:**
```javascript
books.find(item => item.id === req.params.id)
```
- `books.find()` - Array method that finds first matching element
- `item => item.id === req.params.id` - Test condition
- Returns the book object if found, `undefined` if not

**Accessing route parameters:**
```javascript
req.params.id  // Gets the :id value from URL
```

**Success case:**
- Book found → Return it with 200 status

**Failure case:**
- Book not found → Return error message with 404 status

**Example Requests:**

✅ **Valid ID:**
```
GET http://localhost:3000/get/2
```
**Response:**
```json
{
  "id": "2",
  "title": "Book 2"
}
```
**Status:** `200 OK`

❌ **Invalid ID:**
```
GET http://localhost:3000/get/999
```
**Response:**
```json
{
  "message": "Book not available, try different Book ID."
}
```
**Status:** `404 Not Found`

---

##### **Route 4: Add New Book (POST)**

```javascript
app.post('/add', (request, response) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
    title: `Book ${books.length + 1}`
  };
  
  books.push(newBook);
  
  response.status(200).json({
    data: newBook,
    message: `New Book added successfully`
  });
});
```

**Step-by-step:**

**Line 1-5:** Create new book object
```javascript
const newBook = {
  id: Math.floor(Math.random() * 1000).toString(),
  title: `Book ${books.length + 1}`
};
```

**ID Generation:**
- `Math.random()` → Random decimal (0.0 to 1.0)
- `* 1000` → Scale to 0-1000
- `Math.floor()` → Round down to integer
- `.toString()` → Convert to string
- Result: Random ID like "742", "15", "891"

**Title Generation:**
- `books.length + 1` → Next number in sequence
- If 4 books exist, new title = "Book 5"

**Line 7:** `books.push(newBook);`
- Adds new book to end of array
- Modifies original array (in-memory)

**Lines 9-13:** Send response
- Status 200 (success)
- Include created book in `data` field
- Confirmation message

**Request:**
```
POST http://localhost:3000/add
Content-Type: application/json

{}  (empty body, we auto-generate everything)
```

**Response:**
```json
{
  "data": {
    "id": "847",
    "title": "Book 5"
  },
  "message": "New Book added successfully"
}
```

**Note:** In real apps, you'd get data from `request.body`!

---

##### **Route 5: Update Book (PUT)**

```javascript
app.put('/update/:id', (request, response) => {
  const findCurrentBook = books.find(book => 
    book.id === request.params.id
  );
  
  if (findCurrentBook) {
    findCurrentBook.title = request.body.title || findCurrentBook.title;
    response.status(200).json({
      message: `Book with id ${findCurrentBook.id} updated sucessfully`,
    });
  } else {
    response.status(404).json({
      message: `Book with id ${findCurrentBook} is not aviable `,
    });
  }
});
```

**Breaking it down:**

**Find the book:**
```javascript
const findCurrentBook = books.find(book => 
  book.id === request.params.id
);
```
- Search for book with matching ID
- Store reference to the actual object in array

**Update logic:**
```javascript
findCurrentBook.title = request.body.title || findCurrentBook.title;
```

**What this means:**
- `request.body.title` = New title from request
- `||` = OR operator (fallback)
- `findCurrentBook.title` = Current title
- Translation: "Use new title if provided, otherwise keep old title"

**Why use reference?**
```javascript
findCurrentBook.title = "New Title";
```
Since `findCurrentBook` is a reference to the actual object in the array, modifying it directly updates the array!

**Success Response:**
```json
{
  "message": "Book with id 1 updated sucessfully"
}
```

**Failure Response:**
```json
{
  "message": "Book with id undefined is not aviable "
}
```

**Bug Note:** There's a small bug - when book not found, `findCurrentBook` is `undefined`, so message shows "id undefined". Should be:
```javascript
res.status(404).json({ message: `Book with id ${request.params.id} not found` });
```

**Example Request:**
```
PUT http://localhost:3000/update/1
Content-Type: application/json

{
  "title": "Updated Book Title"
}
```

**Response:**
```json
{
  "message": "Book with id 1 updated sucessfully"
}
```

---

##### **Route 6: Delete Book (DELETE)**

```javascript
app.delete('/delete/:id', (request, response) => {
  const findId = request.params.id;
  
  const newBooksCollection = books.filter(book => 
    book.id !== findId
  );
  
  if (newBooksCollection.length === books.length) {
    return response.status(404).json({
      message: `There is no such book like that ! `,
      data: books
    });
  }
  
  books = newBooksCollection;
  
  response.status(200).json({
    message: `The Book is deleted successfully`,
    data: books
  });
});
```

**Step-by-step breakdown:**

**Line 1:** Get the ID
```javascript
const findId = request.params.id;
```
- Extract ID from URL parameter

**Lines 3-5:** Filter out the book
```javascript
const newBooksCollection = books.filter(book => 
  book.id !== findId
);
```

**How `filter()` works:**
- Creates NEW array with elements that pass the test
- Test: `book.id !== findId` (keep books whose ID doesn't match)
- Original `books` array unchanged (yet)

**Example:**
```javascript
books = [
  {id:"1", title:"Book 1"},
  {id:"2", title:"Book 2"},
  {id:"3", title:"Book 3"}
]

// Delete id="2"
books.filter(book => book.id !== "2")
// Returns: [{id:"1",...}, {id:"3",...}]
```

**Lines 7-12:** Check if book was found
```javascript
if (newBooksCollection.length === books.length) {
  return response.status(404).json({...});
}
```

**Logic:**
- If lengths are equal → No books were removed
- Means the ID wasn't found
- Return 404 error immediately

**Lines 14-15:** Update books array
```javascript
books = newBooksCollection;
```
- Replace old array with filtered array
- Deleted book is now gone from memory

**Lines 17-21:** Send success response
```javascript
response.status(200).json({
  message: `The Book is deleted successfully`,
  data: books
});
```
- Status 200 (OK)
- Confirmation message
- Updated books list (without deleted book)

**Example 1: Successful Deletion**

**Before:**
```json
books = [
  {"id": "1", "title": "Book 1"},
  {"id": "2", "title": "Book 2"},
  {"id": "3", "title": "Book 3"}
]
```

**Request:**
```
DELETE http://localhost:3000/delete/2
```

**After:**
```json
books = [
  {"id": "1", "title": "Book 1"},
  {"id": "3", "title": "Book 3"}
]
```

**Response:**
```json
{
  "message": "The Book is deleted successfully",
  "data": [
    {"id": "1", "title": "Book 1"},
    {"id": "3", "title": "Book 3"}
  ]
}
```

**Example 2: Book Not Found**

**Request:**
```
DELETE http://localhost:3000/delete/999
```

**Response:**
```json
{
  "message": "There is no such book like that ! ",
  "data": [
    {"id": "1", "title": "Book 1"},
    {"id": "2", "title": "Book 2"},
    {"id": "3", "title": "Book 3"}
  ]
}
```
**Status:** `404 Not Found`

---

#### **HTTP Methods Explained:**

| Method | Purpose | Idempotent? | Body? |
|--------|---------|-------------|-------|
| **GET** | Retrieve data | Yes | No |
| **POST** | Create resource | No | Yes |
| **PUT** | Update/Replace | Yes | Yes |
| **DELETE** | Remove resource | Yes | No |

**Idempotent** = Multiple identical requests have same effect as one request

- GET is idempotent: Getting data multiple times doesn't change anything
- POST is NOT idempotent: Creating same resource twice creates duplicates
- PUT is idempotent: Updating same resource twice = same result
- DELETE is idempotent: Deleting already-deleted resource = no change

---

#### **HTTP Status Codes Reference:**

**2xx - Success:**
- `200 OK` - Request succeeded
- `201 Created` - Resource created
- `204 No Content` - Success but nothing to return

**4xx - Client Errors:**
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Need authentication
- `403 Forbidden` - No permission
- `404 Not Found` - Resource doesn't exist

**5xx - Server Errors:**
- `500 Internal Server Error` - Server crashed
- `502 Bad Gateway` - Upstream server failed

---

#### **Testing Your API:**

##### **Method 1: Using cURL**

**Get all books:**
```bash
curl http://localhost:3000/get
```

**Get single book:**
```bash
curl http://localhost:3000/get/1
```

**Add new book:**
```bash
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My New Book\"}"
```

**Update book:**
```bash
curl -X PUT http://localhost:3000/update/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Updated Title\"}"
```

**Delete book:**
```bash
curl -X DELETE http://localhost:3000/delete/1
```

---

##### **Method 2: Using Postman**

1. Open Postman
2. Select HTTP method (GET/POST/PUT/DELETE)
3. Enter URL: `http://localhost:3000/get`
4. Click "Send"
5. View response!

For POST/PUT:
- Go to "Body" tab
- Select "raw"
- Choose "JSON"
- Enter: `{"title": "New Book"}`

---

##### **Method 3: Using Browser**

Only works for GET requests:
- Visit: `http://localhost:3000/`
- Visit: `http://localhost:3000/get`
- Visit: `http://localhost:3000/get/1`

For POST/PUT/DELETE, need tools like Postman or cURL.

---

#### **API Best Practices:**

✅ **Use proper HTTP methods**
- GET for reading
- POST for creating
- PUT/PATCH for updating
- DELETE for removing

✅ **Use appropriate status codes**
- 200 for success
- 201 for created
- 404 for not found
- 500 for server errors

✅ **Version your API**
```javascript
/api/v1/books
/api/v2/books
```

✅ **Use plural nouns for resources**
- `/books` not `/book`
- `/users` not `/user`

✅ **Return consistent response format**
```javascript
// Success
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}

// Error
{
  "success": false,
  "error": "Error message here"
}
```

✅ **Implement pagination**
```javascript
GET /books?page=1&limit=10
```

✅ **Add filtering/sorting**
```javascript
GET /books?category=fiction&sort=title&order=asc
```

✅ **Secure your API**
- Use authentication (JWT, OAuth)
- Validate input data
- Rate limiting

---

#### **Common Mistakes:**

❌ **Using GET for everything:**
```javascript
// WRONG
app.get('/create', (req, res) => {...});
app.get('/delete', (req, res) => {...});
```

✅ **Use proper methods:**
```javascript
// CORRECT
app.post('/books', (req, res) => {...});
app.delete('/books/:id', (req, res) => {...});
```

---

❌ **Not handling errors:**
```javascript
// BAD
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  res.send(book); // Returns null if not found!
});
```

✅ **Handle 404:**
```javascript
// GOOD
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({error: 'Not found'});
  }
  res.json(book);
});
```

---

❌ **Inconsistent naming:**
```javascript
GET /getAllBooks
POST /addNewBook
GET /retrieveSingleBook
```

✅ **Be consistent:**
```javascript
GET /books
POST /books
GET /books/:id
```

---

#### **Next Steps - Improving This API:**

1. **Use a real database** (MongoDB, PostgreSQL)
2. **Add validation** (check if title exists, length limits)
3. **Add authentication** (protect routes with JWT)
4. **Add pagination** (limit results)
5. **Add search/filter** (query parameters)
6. **Use environment variables** (port, DB credentials)
7. **Add logging** (track requests)
8. **Write tests** (automated testing)
9. **Add documentation** (Swagger/OpenAPI)
10. **Implement rate limiting** (prevent abuse)

---

#### **Complete Execution Flow:**

```
START
  ↓
Import Express ✓
  ↓
Initialize app ✓
  ↓
Setup middleware (JSON parsing) ✓
  ↓
Initialize books array (4 books) ✓
  ↓
Define routes:
  - GET /         ✓
  - GET /get      ✓
  - GET /get/:id  ✓
  - POST /add     ✓
  - PUT /update/:id ✓
  - DELETE /delete/:id ✓
  ↓
Start server on port 3000 ✓
  ↓
Print: "Server is running at port number 3000" ✓
  ↓
WAIT FOR REQUESTS...
```

**When user makes requests:**

**Request 1:** GET `/get`
→ Returns all 4 books

**Request 2:** POST `/add`
→ Creates Book 5, now 5 books total

**Request 3:** GET `/get/3`
→ Returns Book 3

**Request 4:** PUT `/update/3`
→ Updates Book 3's title

**Request 5:** DELETE `/delete/2`
→ Removes Book 2, now 4 books

**Request 6:** GET `/get/999`
→ Returns 404 error

---

This completes your comprehensive guide to building REST APIs with Node.js and Express!

---

## Chapter 11: MongoDB with Mongoose

### 🎯 Learning Objectives
- Connect to MongoDB database
- Define schemas and models
- Perform CRUD operations

### 💻 Code Example

**File: `app.js`**
```javascript
const mongoose = require("mongoose");
require('dotenv').config();
const dbUrl = process.env.URL;

mongoose.connect(dbUrl)
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  tags: [String],
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function runQueriesExamples() {
  try {
    // Create user
    const newUser = await User.create({
      name: "Abhishek Singh",
      email: "abhi@gmail.com",
      age: 23,
      tags: ['developer', 'devops', 'ai'],
      isActive: true,
    });

    // Get all users
    const allUsers = await User.find({});
    
    // Get inactive users
    const getInactiveUsers = await User.find({ isActive: false });
    
    // Find first match
    const getFirstUser = await User.findOne({ isActive: false });
    
    // Select specific fields
    const selectedFields = await User.find().select("name email -_id");
    
    // Limit and skip results
    const limitedUsers = await User.find().limit(5).skip(2).select("name age email -_id");
    
    // Sort results
    const sortedUsers = await User.find().sort({ age: -1 });
    
    // Count documents
    const countDocuments = await User.countDocuments({ isActive: true });
    
    // Delete user
    const deletedUser = await User.findByIdAndDelete(newUser._id);
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      newUser._id,
      { $set: { age: 100 }, $push: { tags: 'updated' } },
      { returnDocument: 'after' }
    );

  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueriesExamples();
```

### 📝 Comprehensive Explanation

#### **What is MongoDB?**

**MongoDB** is a NoSQL database that stores data in flexible, JSON-like documents instead of tables with rows and columns.

**SQL vs MongoDB:**
- **SQL (MySQL)**: Tables, rows, columns - rigid structure
- **MongoDB**: Collections, documents - flexible structure

**Analogy:**
- SQL = Excel spreadsheet (fixed columns)
- MongoDB = Filing cabinet (each folder can be different)

---

#### **What is Mongoose?**

**Mongoose** is an ODM (Object Data Modeling) library that makes working with MongoDB easier.

**Why use Mongoose?**
- ✅ Schema validation (enforce data structure)
- ✅ Type casting (automatic conversion)
- ✅ Query builder (easier than raw MongoDB)
- ✅ Default values
- ✅ Middleware/hooks
- ✅ Relationships between collections

---

#### **Detailed Breakdown:**

##### **Part 1: Setup and Connection**

```javascript
const mongoose = require("mongoose");
require('dotenv').config();
const dbUrl = process.env.URL;

mongoose.connect(dbUrl)
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log(err));
```

**Step-by-step:**

1. **Import mongoose**: Load the library
2. **Load .env**: Get environment variables
3. **Get DB URL**: Connection string from environment
4. **Connect**: Establish connection to MongoDB
5. **Handle success**: Log when connected
6. **Handle errors**: Log if connection fails

**Environment Variables (.env file):**
```
URL=mongodb://localhost:27017/mydatabase
```

**Why use .env?**
- Keep secrets out of code
- Different configs for dev/production
- Never commit passwords to Git

---

##### **Part 2: Defining Schema**

```javascript
const userSchema = new mongoose.Schema({
  name: String,        // Text data
  email: String,       // Email address
  age: Number,         // Numeric value
  tags: [String],      // Array of strings
  isActive: Boolean,   // True/false
  createdAt: { type: Date, default: Date.now }  // Timestamp
});
```

**Schema = Blueprint** that defines document structure.

**Field Types:**
- `String` - Text
- `Number` - Integers or decimals
- `Boolean` - true/false
- `Date` - Dates/times
- `[Type]` - Arrays
- `Object` - Nested objects

**Default Values:**
```javascript
createdAt: { type: Date, default: Date.now }
```
Automatically sets current date when document created!

---

##### **Part 3: Creating Model**

```javascript
const User = mongoose.model("User", userSchema);
```

**What is a Model?**
A **Model** represents a collection and provides methods to interact with it.

**Naming:**
- Model name: Singular → `User`
- Collection name: Auto-pluralized → `users`

**What Model gives you:**
- `User.create()` - Create documents
- `User.find()` - Search documents
- `User.update()` - Modify documents
- `User.delete()` - Remove documents

---

##### **Part 4: CREATE Operations**

**Method 1: Using create()**
```javascript
const newuser = await User.create({
  name: "Abhishek Singh",
  email: "abhi@gmail.com",
  age: 23,
  tags: ['developer','devops','ai'],
  isActive: true,
});
```

**What happens:**
1. Validate against schema
2. Add `_id` automatically
3. Save to database
4. Return complete document

**Method 2: Using new + save()**
```javascript
const anotherUser = new User({
  name: "Abhishek Singh2",
  email: "abhi22@gmail.com",
  age: 22,
  tags: ['developer','devops','ai'],
  isActive: false
});
await anotherUser.save();
```

**Difference:**
- `create()` - Direct to database
- `new` + `save()` - Create in memory first, then save

---

##### **Part 5: READ Operations**

**Get All Documents:**
```javascript
const allUsers = await User.find({});
```
- Empty filter `{}` = get everything
- Returns array of all documents

**Filter Documents:**
```javascript
const getUsersOfActiveFalse = await User.find({isActive: false});
```
- Filter: `{ isActive: false }`
- Returns only inactive users

**Find One Document:**
```javascript
const getFirstUser = await User.findOne({isActive: false});
```
- Returns FIRST match only
- Not an array, single object

**Select Specific Fields:**
```javascript
const selectedFields = await User.find().select("name email -_id");
```
- Include: `name`, `email`
- Exclude: `_id` (minus sign)
- Saves bandwidth, improves privacy

**Pagination:**
```javascript
const limitedUsers = await User.find()
  .limit(5)      // Max 5 documents
  .skip(2);      // Skip first 2
```
- Page 1: skip(0), limit(10) → Items 1-10
- Page 2: skip(10), limit(10) → Items 11-20

**Sorting:**
```javascript
const sortedUsers = await User.find().sort({age: -1});
```
- `-1` = Descending (high to low)
- `1` = Ascending (low to high)
- Sort by age: oldest first

---

##### **Part 6: COUNT Operations**

```javascript
const countDocuments = await User.countDocuments({isActive: true});
```
- Counts matching documents
- Returns number (integer)
- Doesn't return actual documents

**Example:** If 3 users are active, returns `3`

---

##### **Part 7: DELETE Operations**

```javascript
const deleteduser = await User.findByIdAndDelete(newuser._id);
```

**What it does:**
1. Find document by `_id`
2. Delete from database
3. Return the deleted document

**Other delete methods:**
```javascript
User.deleteOne({ email: "test@example.com" });  // Delete one
User.deleteMany({ isActive: false });           // Delete many
```

---

##### **Part 8: UPDATE Operations**

```javascript
const updatedUser = await User.findByIdAndUpdate(
  newuser._id,
  { 
    $set: { age: 100 },           // Set age to 100
    $push: { tags: 'updated' }    // Add 'updated' to tags array
  },
  { returnDocument: 'after' }     // Return updated doc
);
```

**MongoDB Operators:**

**`$set`** - Set field values:
```javascript

---

## 🎓 Conclusion

Congratulations! You've completed this comprehensive journey through Node.js fundamentals. From basic module systems to building full REST APIs with MongoDB integration, you now have the foundation to build production-ready backend applications.

### What You've Learned:

✅ Module system and CommonJS patterns  
✅ File system operations (sync and async)  
✅ HTTP server creation and routing  
✅ Asynchronous programming (callbacks, promises, async/await)  
✅ Event-driven architecture  
✅ Express.js framework  
✅ RESTful API design  
✅ MongoDB database integration with Mongoose  

### Next Steps:

1. **Build Projects**: Apply these concepts to real-world applications
2. **Learn Authentication**: JWT, OAuth, session management
3. **Explore Testing**: Jest, Mocha, Supertest
4. **Study Deployment**: Docker, Kubernetes, cloud platforms
5. **Advanced Topics**: Microservices, GraphQL, WebSockets

---

## 📚 About This Repository

This repository contains **13 chapters** of hands-on Node.js learning, carefully structured to take you from basics to advanced topics. Each chapter includes:

- Working code examples
- Detailed explanations
- Best practices
- Real-world applications

### Repository Structure:

```
NodeJS/
├── 2.node_module_system/      # Chapter 1: Modules
├── 4.path-module/             # Chapter 2: Path handling
├── 5.file-system/             # Chapter 3: File operations
├── 6.http-module/             # Chapter 4: HTTP servers
├── 7.callbacks/               # Chapter 5: Callbacks
├── 8.promises/                # Chapter 6: Promises
├── 9.async-await/             # Chapter 7: Async/Await
├── 10.event-emitter/          # Chapter 8: Events
├── 11.express-js/             # Chapter 9: Express basics
├── 12.REST_API_Development/   # Chapter 10: REST APIs
└── 13.MongoDB_Basic/          # Chapter 11: MongoDB
```

---

## 🚀 Getting Started

### Prerequisites:

- Node.js installed (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (for Chapter 11)
- Code editor (VS Code recommended)

### Running the Examples:

```bash
# Navigate to any chapter folder
cd 5.file-system

# Run the example
node index.js
```

### For MongoDB Chapter:

```bash
# Install dependencies
npm install

# Create .env file with MongoDB connection string
# URL=mongodb://localhost:27017/mydb

# Run the example
node app.js
```

---

## 📖 About the Author

This comprehensive Node.js guide was engineered with passion and dedication to help developers master backend development. Each chapter builds upon previous knowledge, creating a solid foundation for your Node.js journey.

---

<div align="center">

**Happy Coding! 🎉**

Made with ❤️ for the Node.js community

</div>
