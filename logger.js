console.log(__filename);

console.log(__dirname);

let url = "http://mylogger.io/log";

function log(message) {
  // ...
  console.log(message);
}

module.exports = log;
