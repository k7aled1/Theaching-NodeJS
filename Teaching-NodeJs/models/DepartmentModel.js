const mongoose = require("mongoose");

const DeptModel = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    unique: true,
    required: true,
  },
  Location: String,
  //{
  //   Street: Number,
  //   City: String,
  //   // required: true,
  // },
});
module.exports = mongoose.model("departments", DeptModel);
