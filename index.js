const http = require("node:http");

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello World!")
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})