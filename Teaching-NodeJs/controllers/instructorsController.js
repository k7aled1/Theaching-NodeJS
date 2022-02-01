//here is the Instructors controllers
//cause i will use all of the funcs(callbacks) here every one of it by it self so i will export them individually
const { query, param } = require("express");
const { validationResult } = require("express-validator");
const Instructor = require("../models/InstructorModel");
const UserModel = require("../models/UserModel");

//list callback
exports.getInstructors = function (request, response, next) {
  console.log("Get All Instructors");
  Instructor.find({})
    .populate({ path: "Department" })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};

//add callback
// exports.addInstructor = (request, response, next) => {
//   let errors = validationResult(request);
//   if (!errors.isEmpty()) {
//     let error = new Error();
//     error.status = 422;
//     error.message = errors
//       .array()
//       .reduce((current, object) => current + object.msg + " ", "");
//     next(error);
//   } else {
//     let newInstructor = new Instructor({
//       _id: request.body.id,
//       FullName: request.body.fullName,
//       Department: request.body.department,
//     });

//     newInstructor.save().then((result) => {
//       response
//         .status(201)
//         .json({ message: "Instructor added" })
//         .catch((error) => next(error));
//     });
//   }
// };

//update callback
exports.updateInstructor = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Instructor.updateOne(
      { _id: request.body.id },
      {
        $set: {
          FullName: request.body.fullName,
          Department: request.body.department,
        },
      }
    )
      .then((result) => {
        response.status(202).json({ message: "Instructor Updated" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

//delete callback
exports.deleteInstructor = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Instructor.deleteOne({ _id: request.query.id })
      .then((res) => {
        console.log(res);
        UserModel.deleteOne({ UserID: request.query.id })
          .then((res) => {
            response.status(202).json({ message: "Instructor Deleted" });
          })
          .catch((error) => {
            error.status = 500;
            next(error);
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
