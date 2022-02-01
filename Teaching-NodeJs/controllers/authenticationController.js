const UserModel = require("../models/UserModel");
const StudentModel = require("../models/StudentModel");
const InstructorModel = require("../models/InstructorModel");
const { validationResult } = require("express-validator");

//hashing password
const bcrypt = require("bcrypt");
const saltRounds = 10;
// all i will do just exports all callbacks

//login callback

exports.login = async function (request, response, next) {
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
    })
      .populate("UserID")
      .then(async (res) => {
        // db.getCollection('users').find({},{_id:false,Password:true}).toArray()
        const match = await bcrypt.compare(request.body.pass, res.Password);
        if (match) {
          response.status(200).json({
            message: "Login Success Welcome " + res.UserID.FullName,
            userType: res.UserType,
          });
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

exports.register = async function (request, response, next) {
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
    let pass;
    await bcrypt
      .hash(request.body.pass, saltRounds)
      .then(async function (hash) {
        // Store hash in your password DB.
        pass = hash;
      });

    // console.log(pass);
    let newUser = new UserModel({
      UserID: request.body.userId,
      UserType: request.body.userType,
      Email: request.body.email,
      Password: pass,
    });

    if (newUser.UserType === "students") {
      let newStudent = new StudentModel({
        _id: newUser.UserID,
        FullName: request.body.fullName,
        Department: request.body.deptId,
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
    } else {
      let newInstructor = new InstructorModel({
        _id: newUser.UserID,
        FullName: request.body.fullName,
        Department: request.body.deptId,
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
