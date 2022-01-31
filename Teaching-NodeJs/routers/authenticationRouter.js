const express = require("express");
const { body, param, query } = require("express-validator");

const controller = require("./../controllers/authenticationController");
const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter Valid Email"),
    //! not good
    body("pass").isInt().withMessage("Please Enter Valid Password"),
  ],
  //! i can use distructing with login in the end i will try
  controller.login
);
//   "/register/:deptID/:email/:pass",
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("userId").isInt().withMessage("id Must be integer"),
    body("userType")
      .isIn(["students", "instructors"])
      .withMessage("Type must be students or instructors"),
    body("pass").isInt().withMessage("password must be integer"),
    // body("passConfirm").custom((value, { req }) => {
    //   if (value !== req.body.pass) {
    //     throw new Error("pass confirmation doesn't match pass");
    //   }
    // }),
  ],
  controller.register
);

module.exports = router;
