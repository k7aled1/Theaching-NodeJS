const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("./../controllers/studentsControllers");

const router = express.Router();

router.get("/", controller.getStudents);
//////////////////////////////////////////
// router.post(
//   "/",
//   [
//     body("id").isInt().withMessage("id must be integer"),
//     body("fullName").isAlpha().withMessage("name must be String"),
//     body("department").isInt().withMessage("DeptID must be integer"),
//   ],
//   controller.addStudent
// );

router.put(
  "/",
  [
    body("id").isInt().withMessage("id must be integer"),
    body("fullName").isAlpha().withMessage("name must be String"),
    body("department").isInt().withMessage("DeptID must be integer"),
  ],
  controller.updateStudent
);

router.delete(
  "/",
  //! param doesn't work ?!!!
  [query("id").isInt().withMessage("id must be number")],
  controller.deleteStudent
);

module.exports = router;
