require("dotenv").config();
const path = require("path");
const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "development") {
  // on Heroku machine, an env variable is called "NODE_ENV" with the value of "production"
  const cors = require("cors");
  server.use(cors());
}

server.get("/api/hello", (req, res) => {
  res.json({
    message: "hello",
  });
});

// Catch-all that just sends back index.html
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
