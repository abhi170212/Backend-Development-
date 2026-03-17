# 📘 The Complete Node.js Journey: From Zero to Hero

*A comprehensive guide through Node.js fundamentals, structured like a book with practical code examples and detailed explanations.*

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

#### **Key Concepts:**

1. **Module Exports (`module.exports`)**: 
   - Functions, objects, or values you want to share with other files must be exported
   - In `first_module.js`, we export three functions: `sum`, `subtract`, and `divide`

2. **Require Statement**: 
   - Used to import modules from other files
   - `const md = require("./first_module")` imports all exported functions

3. **Module Wrapper Function**: 
   - Node.js wraps every module in a special function that provides:
     - `exports` - Reference to module.exports
     - `require` - Function to import modules
     - `module` - Reference to current module
     - `__filename` - Current file's absolute path
     - `__dirname` - Current directory's absolute path

4. **Error Handling**: 
   - The try-catch block demonstrates proper error handling when dividing by zero
   - This prevents application crashes and provides meaningful error messages

#### **Output:**
```
9
trying to divide by zero
caught an error Can not divide by zero
```

---

## Chapter 2: Understanding Path Module

### 🎯 Learning Objectives
- Master path manipulation in Node.js
- Learn cross-platform path handling
- Understand path joining, normalization, and parsing

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

#### **The Path Module**

The `path` module provides utilities for working with file and directory paths in a **cross-platform** manner (Windows uses backslashes `\`, while Unix/Linux/Mac use forward slashes `/`).

#### **Key Methods:**

1. **`path.dirname(__filename)`**:
   - Returns the directory name from a path
   - Example: `/Users/Abhishek/Desktop/webdev/NodeJS/4.path-module`

2. **`path.basename(__filename)`**:
   - Returns the last portion of a path (filename)
   - Example: `index.js`

3. **`path.extname(__filename)`**:
   - Returns the file extension
   - Example: `.js`

4. **`path.join(...paths)`**:
   - Joins multiple path segments together
   - Automatically handles platform-specific separators
   - Example: `/users/documents/node/projects`

5. **`path.normalize(path)`**:
   - Cleans up messy paths by resolving `.` and `..` segments
   - Example: `/user/.documents/.../node_folder` becomes `/user/node_folder`

#### **Why Use Path Module?**

- **Cross-platform compatibility**: Write once, run anywhere
- **Prevents errors**: No manual string concatenation for paths
- **Cleaner code**: More readable and maintainable

---

## Chapter 3: File System Operations

### 🎯 Learning Objectives
- Learn synchronous and asynchronous file operations
- Understand callback hell and its implications
- Master file creation, reading, updating, and deletion

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

#### **The File System (fs) Module**

The `fs` module provides two types of operations:
1. **Synchronous** (blocking) - Ends with `Sync`
2. **Asynchronous** (non-blocking) - Uses callbacks

#### **Synchronous Operations:**

1. **`fs.existsSync(path)`**: Checks if a path exists
2. **`fs.mkdirSync(path)`**: Creates a directory
3. **`fs.writeFileSync(path, data)`**: Writes data to a file
4. **`fs.readFileSync(path, encoding)`**: Reads entire file content
5. **`fs.appendFileSync(path, data)`**: Appends data to existing file

#### **Asynchronous Operations:**

- Non-blocking: Other code continues executing while file operation completes
- Uses **callbacks** (functions passed as arguments)
- Better for production applications

#### **Callback Hell:**

The nested callbacks in the async example demonstrate **callback hell** (also called "Pyramid of Doom"):
- Multiple levels of nested callbacks
- Hard to read and maintain
- Difficult error handling
- **Solution**: Promises and Async/Await (covered in later chapters)

#### **Output:**
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

---

## Chapter 4: Building HTTP Servers

### 🎯 Learning Objectives
- Understand the HTTP module
- Create web servers
- Implement basic routing

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
    res.end("Project page");
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

#### **The HTTP Module**

Node.js has a built-in `http` module that allows you to create web servers without any external dependencies.

#### **Creating a Server:**

1. **`http.createServer(callback)`**: 
   - Creates an HTTP server
   - Callback receives `req` (request) and `res` (response) objects

2. **Response Methods**:
   - `res.writeHead(statusCode, headers)`: Sets HTTP status and headers
   - `res.end(data)`: Sends response and closes connection

3. **Server Listening**:
   - `server.listen(port, callback)`: Starts server on specified port

#### **Routing:**

- **Request URL** (`req.url`): Determines which "page" user wants
- Basic routing checks URL and sends appropriate response
- **404 Not Found**: Default response for undefined routes

#### **HTTP Status Codes:**
- `200`: Success
- `404`: Not Found

#### **Testing:**
Run the server and navigate to:
- `http://localhost:4000/` - Home page
- `http://localhost:80/projects` - Projects page
- Any other route - 404 error

---

## Chapter 5: Callbacks and Asynchronous Programming

### 🎯 Learning Objectives
- Understand callback functions
- Learn asynchronous execution flow
- Master callback patterns

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

#### **What is a Callback?**

A **callback** is a function passed as an argument to another function, which is executed at a later time.

#### **How It Works:**

1. **Function Definition**: `Person` accepts two parameters:
   - `name`: A string
   - `callback`: A function to be executed later

2. **Execution Flow**:
   - First, `Person` logs the greeting: `"Hello, Abhishek Kumar Singh"`
   - Then, it calls the `callback()` function
   - The callback executes `address()` which logs `"India"`

3. **Output**:
   ```
   Hello, Abhishek Kumar Singh
   India
   ```

#### **Why Use Callbacks?**

- **Asynchronous operations**: File I/O, database queries, network requests
- **Non-blocking code**: Allows other operations to continue
- **Event handling**: Respond to user actions, timer completions

#### **Callback Types:**

1. **Synchronous Callbacks**: Execute immediately (like this example)
2. **Asynchronous Callbacks**: Execute after some operation completes (seen in Chapter 3)

---

## Chapter 6: Promises - Taming Async Code

### 🎯 Learning Objectives
- Understand Promise states
- Learn promise chaining
- Master error handling with promises

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

#### **What is a Promise?**

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

#### **Promise States:**

1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled (Resolved)**: Operation completed successfully
3. **Rejected**: Operation failed

#### **Creating Promises:**

```javascript
new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(value);  // Mark as fulfilled
  } else {
    reject(error);   // Mark as rejected
  }
});
```

#### **Consuming Promises:**

- **`.then(successCallback)`**: Executes when promise resolves
- **`.catch(errorCallback)`**: Executes when promise rejects

#### **Execution Flow:**

1. `"promise Lecture Starts"` logs immediately
2. `delay(2000)` starts a 2-second timer
3. `"End"` logs immediately (doesn't wait for timer)
4. After 2 seconds: `"After 2 seconds Promise Resolved"`

#### **Output:**
```
promise Lecture Starts
End
2
After 2 seconds Promise Resolved
Can not divide it br,sorry
```

#### **Advantages Over Callbacks:**

- ✅ Cleaner syntax
- ✅ Better error handling
- ✅ Avoids callback hell
- ✅ Chainable operations

---

## Chapter 7: Async/Await - Writing Elegant Async Code

*Note: This chapter builds on Promises with modern syntax*

### 🎯 Learning Objectives
- Understand async/await syntax
- Write cleaner async code
- Handle errors gracefully

### 💻 Conceptual Example

```javascript
async function fetchData() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error(error);
  }
}
```

### 📝 Explanation

#### **Async/Await Basics:**

- **`async`**: Keyword before a function declaration makes it return a Promise
- **`await`**: Pauses execution until Promise resolves (can only be used inside async functions)

#### **Benefits:**

1. **Synchronous-like readability**: Code looks sequential
2. **Better error handling**: Use try-catch blocks
3. **No more `.then()` chains**: Cleaner code structure

---

## Chapter 8: Event Emitters

### 🎯 Learning Objectives
- Understand the Observer pattern
- Learn event-driven architecture
- Master EventEmitter usage

### 💻 Code Example

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
```

### 📝 Explanation

#### **Event-Driven Architecture:**

Node.js uses an **event-driven** model where certain objects emit events that other objects can listen for and respond to.

#### **Key Components:**

1. **EventEmitter Class**: 
   - Imported from the built-in `events` module
   - Instance created with `new EventEmitter()`

2. **Event Registration** (`.on(event, callback)`):
   - Listens for specific events
   - When event occurs, callback executes

3. **Event Emission** (`.emit(event, ...args)`):
   - Triggers the event
   - Passes arguments to all listeners

#### **How It Works:**

1. Create EventEmitter instance
2. Register listener for `'greet'` event
3. Emit `'greet'` event with argument `'Abhishek Singh'`
4. Listener callback executes, logging: `"Hello Abhishek Singh"`

#### **Real-World Use Cases:**

- User interactions (clicks, form submissions)
- Data stream processing
- Microservices communication
- Plugin architectures

---

## Chapter 9: Express.js Fundamentals

### 🎯 Learning Objectives
- Introduction to Express.js framework
- Understand middleware concept
- Build basic web applications

### 💻 Code Structure

Express.js simplifies HTTP server creation and routing compared to the raw `http` module.

#### **Key Features:**

1. **Simplified Routing**: Clean API for defining routes
2. **Middleware Support**: Process requests before reaching final handler
3. **Request/Response Helpers**: Easy access to params, query strings, body

---

## Chapter 10: REST API Development

### 🎯 Learning Objectives
- Understand REST architectural style
- Implement CRUD operations
- Build production-ready APIs

### 💻 Code Example

**File: `app.js`**
```javascript
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

let books = [
  { id: "1", title: "Book 1" },
  { id: "2", title: "Book 2" },
  { id: "3", title: "Book 3" },
  { id: "4", title: "Book 4" },
];

// Welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our bookstore api" });
});

// Get all books
app.get("/get", (req, res) => {
  res.json(books);
});

// Get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not available" });
  }
});

// Add a new book
app.post('/add', (request, response) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
    title: `Book ${books.length + 1}`
  };
  books.push(newBook);
  response.status(200).json({
    data: newBook,
    message: "New Book added successfully"
  });
});

// Update a book
app.put('/update/:id', (request, response) => {
  const findCurrentBook = books.find(book => book.id === request.params.id);
  if (findCurrentBook) {
    findCurrentBook.title = request.body.title || findCurrentBook.title;
    response.status(200).json({ message: "Book updated successfully" });
  } else {
    response.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete('/delete/:id', (request, response) => {
  const findId = request.params.id;
  const newBooksCollection = books.filter(book => book.id !== findId);
  
  if (newBooksCollection.length === books.length) {
    return response.status(404).json({ message: "Book not found", data: books });
  }
  
  books = newBooksCollection;
  response.status(200).json({ message: "Book deleted successfully", data: books });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});
```

### 📝 Explanation

#### **What is REST?**

**REST** (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods.

#### **RESTful Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET /` | Welcome message | API homepage |
| `GET /get` | Get all books | Retrieve all books |
| `GET /get/:id` | Get single book | Retrieve specific book |
| `POST /add` | Add book | Create new book |
| `PUT /update/:id` | Update book | Modify existing book |
| `DELETE /delete/:id` | Delete book | Remove book |

#### **Key Concepts:**

1. **Middleware** (`app.use(express.json())`):
   - Parses incoming JSON requests
   - Makes `request.body` available

2. **Route Parameters** (`:id`):
   - Dynamic segments in URLs
   - Accessed via `req.params.id`

3. **HTTP Methods**:
   - `GET`: Retrieve data
   - `POST`: Create new resource
   - `PUT`: Update existing resource
   - `DELETE`: Remove resource

4. **Status Codes**:
   - `200`: Success
   - `404`: Not Found

#### **Testing the API:**

Use tools like **Postman**, **curl**, or browser:

```bash
# Get all books
curl http://localhost:3000/get

# Get specific book
curl http://localhost:3000/get/1

# Add new book
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book"}'
```

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

### 📝 Explanation

#### **What is Mongoose?**

**Mongoose** is an ODM (Object Data Modeling) library for MongoDB and Node.js that provides:
- Schema validation
- Type casting
- Query building
- Business logic hooks

#### **Key Components:**

1. **Connection**:
   ```javascript
   mongoose.connect(dbUrl)
   ```
   - Connects to MongoDB using connection string from `.env`
   - `.env` file stores sensitive data (never commit to Git)

2. **Schema Definition**:
   ```javascript
   const userSchema = new mongoose.Schema({
     name: String,
     email: String,
     // ...
   });
   ```
   - Defines structure of documents
   - Enforces data types

3. **Model Creation**:
   ```javascript
   const User = mongoose.model("User", userSchema);
   ```
   - Creates interface to collection
   - MongoDB creates `users` collection automatically

#### **CRUD Operations:**

**Create:**
- `User.create({...})` - Create document
- `new User({...}).save()` - Alternative method

**Read:**
- `User.find({})` - Get all documents
- `User.find({isActive: false})` - Filter documents
- `User.findOne({...})` - Get first match
- `.select("name email")` - Choose fields
- `.limit(5).skip(2)` - Pagination
- `.sort({age: -1})` - Sorting (-1 descending, 1 ascending)

**Update:**
- `findByIdAndUpdate(id, {...})` - Find and update
- `$set` - Set field values
- `$push` - Add to array

**Delete:**
- `findByIdAndDelete(id)` - Remove by ID
- `countDocuments({...})` - Count matching documents

#### **Async/Await Pattern:**

All database operations are async, so we use:
- `async` function declaration
- `await` keyword for each operation
- `try-catch-finally` for error handling
- `mongoose.connection.close()` in finally block

#### **Output Example:**
```
DB Connected successfully
{ _id: ..., name: 'Abhishek Singh', email: 'abhi@gmail.com', ... }
[Array of all users]
[Array of inactive users]
{ First inactive user }
[Array with only name and email]
[Limited and paginated results]
[Sorted by age descending]
3
{ Deleted user object }
{ Updated user with age 100 }
```

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
