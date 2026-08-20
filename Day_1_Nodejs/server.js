let http = require("http")

http.createServer((req, res) => {
    res.write("hey i am listning")
    res.end()
}).listen(3000)
