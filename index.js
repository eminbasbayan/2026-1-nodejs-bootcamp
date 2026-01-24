const http = require("node:http");
const fs = require("node:fs");

const loginUser = "Emin";


const server = http.createServer((request, response) => {

    fs.readFile("./index.html", (err, data) => {
        if (err) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Server Error!");
            return;
        }
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        const htmlContent = data.toString().replace("{{loginUser}}", loginUser);
        response.end(htmlContent);
    })
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})