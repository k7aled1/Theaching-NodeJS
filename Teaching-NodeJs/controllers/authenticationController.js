const UserModel = require("../models/UserModel");
const StudentModel = require("../models/StudentModel");
const InstructorModel = require("../models/InstructorModel");
const { validationResult } = require("express-validator");

// all i will do just exports all callbacks

//login callback

exports.login = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    UserModel.findOne({
      Email: request.body.email,
      Password: request.body.pass,
    })
      .then((res) => {
        if (res) {
          UserModel.findOne({
            Email: request.body.email,
            Password: request.body.pass, //!here
          })
            .populate("UserID")
            .then((result) =>
              response.status(200).json({
                message: "Login Success Welcome " + result.UserID.FullName,
                userType: result.UserType,
              })
            );
        } else {
          next(new Error("ur not Authorized"));
        }
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.register = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object, next) => current + object.msg + " ", "");
    next(error);
  } else {
    //new
    let newUser = new UserModel({
      UserID: request.body.userId,
      UserType: request.body.userType,
      Email: request.body.email,
      Password: request.body.pass,
    });

    if (newUser.UserType === "students") {
      let newStudent = new StudentModel({
        _id: newUser.UserID,
        FullName: request.body.fullName,
      });

      newStudent
        .save()
        .then((res) => {
          console.log("student registered ");
          newUser
            .save()
            .then((res) => {
              response
                .status(201)
                .json({ message: "register Success", data: request.body });
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
    } else if (newUser.UserType === "instructors") {
      let newInstructor = new InstructorModel({
        _id: newUser.UserID,
        FullName: request.body.fullName,
      });

      newInstructor
        .save()
        .then((res) => {
          console.log("Instructor registered ");
          newUser
            .save()
            .then((res) => {
              response
                .status(201)
                .json({ message: "register Success", data: request.body });
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
  }
};
