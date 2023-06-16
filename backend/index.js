const server = require("./src/server.js");
require("./src/mongodb");

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`%s listening at ${port}`)
})
