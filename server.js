const app = require("./app");
// const http = require("http");
const port = process.env.PORT || 3000;

// const server = http.createServer(app, () => {
//   console.log("cekcek")
// });

server.listen(port, () => {
  console.log(`listening web in http://localhost:${port}`);
});
