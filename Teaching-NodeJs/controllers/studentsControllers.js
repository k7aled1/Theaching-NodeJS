//here is the Students controllers
//cause i will use all of the funcs(callbacks) here every one of it by it self so i will export them individually
const { query } = require("express");
const { validationResult } = require("express-validator");
const Student = require("../models/StudentModel");

//list callback
exports.getStudents = function (request, response, next) {
  console.log("Get All Students");
  Student.find({})
    .populate("Department")
    .then((result) => {
      // // console.log(result);
      // let arr = [];
      // let i = 0;
      // result.forEach((res) => {
      //   arr[i++] = res.FullName + " " + res.Department.Name;
      // });
      // console.log(arr);
      // response.status(200).json(arr);

      response.status(200).json({ Students: result });
      // // response.send()

      // console.log(result.FullName);
    })
    .catch((error) => next(error));
};

//add callback
exports.addStudent = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    let newStudent = new Student({
      _id: request.body.id,
      FullName: request.body.fullName,
      Department: request.body.department,
    });
    newStudent
      .save()
      .then((result) => {
        response.status(201).json({ message: "Student added" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

//update callback
exports.updateStudent = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Student.updateOne(
      { _id: request.body.id },
      {
        $set: {
          FullName: request.body.fullName,
          Department: request.body.department,
        },
      }
    )
      .then((result) => {
        response.status(202).json({ message: "Student Updated" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

//delete callback
exports.deleteStudent = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Student.deleteOne({ _id: request.body.id })
      .then((res) => {
        response.status(202).json({ message: "Student Deleted" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
