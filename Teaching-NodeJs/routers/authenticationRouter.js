const express = require("express");
const { body, param, query } = require("express-validator");

const {
  login,
  register,
} = require("./../controllers/authenticationController");
const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter Valid Email"),
    //! not good
    body("pass").isInt().withMessage("Please Enter Valid Password"),
  ],
  login
);
//   "/register/:deptID/:email/:pass",
router.post(
  "/register",
  [
    body("fullName")
      .isAlpha()
      .withMessage("name must be string")
      .withMessage("length must be less than 15"),
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("userId").isInt().withMessage("id Must be integer"),
    body("userType")
      .isIn(["students", "instructors"])
      .withMessage("Type must be students or instructors"),
    body("pass").isInt().withMessage("password must be integer"),
    body("passConfirm").custom((value, { req }) => {
      if (value !== req.body.pass) {
        throw new Error("pass confirmation doesn't match pass");
      }
      return true;
    }),
  ],
  register
);

module.exports = router;
