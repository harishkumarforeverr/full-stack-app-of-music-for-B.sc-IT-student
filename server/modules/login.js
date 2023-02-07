const mongoose = require("mongoose");
const validator = require("validator");
const autopopulate = require("mongoose-autopopulate");
require("dotenv/config");
const Schema = mongoose.Schema;

let UserSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { versionKey: false, timestamps: true, collection: "Users" }
);

UserSchema.plugin(autopopulate);
var User = mongoose.model("Users", UserSchema);
module.exports = User;
