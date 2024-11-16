const express = require("express");
const userRouter = require("./users/users-router");
const {logger} = require("./middleware//middleware")


const server = express();
server.use(express.json());
server.use(logger);
server.use("/api/users",userRouter);



server.get('/', (req, res) => {
  res.send(`<h2> Dont Worry Love </h2>`);
});




module.exports = server;