const fs = require("fs");
const os = require("os");

console.log("A");

console.log(os.cpus().length);

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log("B");
});

console.log("C");

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log("D");
});

console.log("E");