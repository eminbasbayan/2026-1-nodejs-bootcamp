const http = require("node:http");

const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
]

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(products))
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})