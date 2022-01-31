// Instructor that contains
//  _id which is number
//  Fullname
//  Courses which contains array of string that holds course names
//  Department that refers to departmentID

const mongoose = require("mongoose");

const InstructorModel = new mongoose.Schema({
  _id: { type: Number, required: true },
  FullName: {
    type: String,
    required: true,
  },
  Courses: [String],
  Department: {
    type: Number,
    ref: "departments",
  },
});

module.exports = mongoose.model("instructors", InstructorModel);
