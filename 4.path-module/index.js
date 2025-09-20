const path = require('path');
console.log("directory name is ",path.dirname(__filename));
console.log("file name is ",path.basename(__filename));
console.log("file extension ",path.extname(__filename));

const joinPath = path.join("/users","documents","node","projects");
console.log("Joined Path is - ",joinPath);

const normalizePath = path.normalize("/user/.documents/.../node_folder")
console.log("normalizePath is",normalizePath);