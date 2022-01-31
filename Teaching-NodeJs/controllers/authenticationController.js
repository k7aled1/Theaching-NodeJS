const UserModel = require("../models/UserModel");
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
          response.status(200).json({ message: "Success login" });
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
      // _id: request.body.id,
      UserID: request.body.userId,
      UserType: request.body.userType,
      Email: request.body.email,
      Password: request.body.pass,
    });

    //save
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
  }
};
