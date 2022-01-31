// https://mongoosejs.com/docs/populate.html#dynamic-ref

const mongoose = require("mongoose");
//! check????
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserModel = new mongoose.Schema({
  // _id: {
  //   // type: Schema.Types.ObjectId,
  //   type: mongoose.Types.ObjectId,
  //   // required: true,
  // },
  UserID: {
    type: Number,
    refPath: "UserType",
  },
  UserType: {
    type: String,
    required: true,
    enum: ["students", "instructors"],
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    // one of them i will use
    validate: [validateEmail, "please fill valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  //! remember to hash it
  Password: {
    type: Number,
    required: true,
  },
});

//!default
module.exports = mongoose.model("users", UserModel);
