//here is the departments controller
//cause i will use all of the funcs(callbacks) here every one of it by it self so i will export them individually
const { query } = require("express");
const { validationResult } = require("express-validator");

const Department = require("../models/DepartmentModel");

//list callback
exports.getDepartments = function (request, response) {
  Department.find({})
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

//add callback
exports.addDepartment = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
    // console.log(errors);
  } else {
    let departmentObject = new Department({
      _id: request.body.id,
      Name: request.body.name,
      Location: request.body.location,
    });
    departmentObject
      .save()
      .then((object) => {
        response.status(201).json({ message: "added" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

//update callback
exports.updateDepartment = function (request, response, next) {
  Department.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        Name: request.body.name,
        Location: request.body.location,
      },
    }
  )
    .then((res) => {
      response.status(201).json({
        message: "department Updated",
      });
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

//delete callback
exports.deleteDepartment = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
    // throw error;
    // console.log(errors);
  } else {
    Department.deleteOne({ _id: request.query.id })
      .then((result) => {
        response.status(201).json({ message: "Department deleted" });
      })
      .catch((error) => {
        error.status = 500;

        next(error);
      });
  }
};
