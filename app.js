const Logger = require("./logger");
const logger = new Logger();
const path = require("path");
const os = require("os");
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/messages") {
    res.write(
      JSON.stringify([
        {
          users: [
            { id: 0, name: "john" },
            { id: 1, name: "bob" },
          ],
          messages: [
            { id: 0, author_id: 0, content: "Hello world" },
            { id: 1, author_id: 1, content: "goodby Universe" },
          ],
        },
      ])
    );
    res.end();
  }
});

// const server = http.createServer();
// server.on("connection", (socket) => {
//   console.log("New connection...");
// });
server.listen(3000);

console.log("Listening on port 3000");

// logger.on("messageLogged", (e) => {
//   console.log("Listener called", e);
// });

// logger.log("message");

// const pathObj = path.parse(__filename);
// console.log(pathObj);

// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();

// console.log("Total Memory: ", totalMemory);
// console.log(`Free Memory: ${freeMemory}`);

// const files = fs.readdir("./", (err, files) => {
//   if (err) console.log("error", err);
//   else console.log("Result", files);
// });
// console.log(files);
