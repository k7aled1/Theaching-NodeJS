const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const departments = require("./routers/departmentsRouter");
const students = require("./routers/studentsRouter");

const instructors = require("./routers/instructorsRouter");

const authentication = require("./routers/authenticationRouter");

const server = express();

mongoose.connect("mongodb://localhost:27017/ExamDB").then(() => {
  console.log("DB Connected");
  //! use process.env.PORT cause i don't know my app port on the server
  server.listen(process.env.PORT || 8080, () => {
    console.log("I'm listening ...");
  });
});

// server.listen(8080, () => {
//   console.log("I'm listinning ........");
// });

//! log using morgan to log
server.use(morgan(":method :url"));

// here not a middlewar it's routing now
server.use("/home", (request, response, next) => {
  response.send("hello from home");
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Authentication
server.use(authentication);

// departments
server.use("/departments", departments);

// students
server.use("/students", students);

// instructors
server.use("/instructors", instructors);
//general middlewar for unknown urls
//this must be be for error handling middlewar and after all other middlewars
server.use((request, response, next) => {
  response.send("Hello from global MiddleWare");
  next();
});

//! error middle ware must be last
server.use((error, request, response, next) => {
  response.send("in error :" + error);
});
