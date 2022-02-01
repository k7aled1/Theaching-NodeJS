const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("./../controllers/departmentsController");

const router = express.Router();

// get tack url and callback // when you use callback you must not call it
router.get("/", controller.getDepartments);

router.post(
  "/",
  [
    body("id").isInt().withMessage("Department Id should be Intger"),
    body("name")
      .isAlpha()
      .withMessage("name should be string ")
      .isLength({ max: 10 })
      .withMessage("name should be less than 10"),
    body("location").isAlpha().withMessage("location should be string"),
  ],
  controller.addDepartment
);

router.put("/", controller.updateDepartment);

router.delete(
  "/",
  //! param doesn't work ?!!!
  [query("id").isInt().withMessage(" Id should be Integer")],
  controller.deleteDepartment
);

// export router obj as default
module.exports = router;
