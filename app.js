const log = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

const pathObj = path.parse(__filename);
// console.log(pathObj);

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

// console.log("Total Memory: ", totalMemory);
// console.log(`Free Memory: ${freeMemory}`);

// const files = fs.readdir("./", (err, files) => {
//   if (err) console.log("error", err);
//   else console.log("Result", files);
// });
// console.log(files);
