const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("./../controllers/instructorsController");

const router = express.Router();

router.get("/", controller.getInstructors);
//////////////////////////////////////////
router.post(
  "/",
  [
    body("id").isInt().withMessage("id must be integer"),
    body("fullName").isAlpha().withMessage("name must be String"),
    body("department").isInt().withMessage("DeptID must be integer"),
  ],
  controller.addInstructor
);

router.put(
  "/",
  [
    body("id").isInt().withMessage("id must be integer"),
    body("fullName").isAlpha().withMessage("name must be String"),
    body("department").isInt().withMessage("DeptID must be integer"),
  ],
  controller.updateInstructor
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("id must be number")],
  controller.deleteInstructor
);

module.exports = router;
