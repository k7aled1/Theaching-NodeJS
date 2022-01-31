const mongoose = require("mongoose");

const StudentModel = new mongoose.Schema({
  _id: { type: Number, required: true },
  FullName: {
    type: String,
    required: true,
  },
  Department: {
    type: Number,
    ref: "departments",
  },
});

module.exports = mongoose.model("students", StudentModel);
