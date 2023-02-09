const mongoose = require("mongoose");
const validator = require("validator");
const autopopulate = require("mongoose-autopopulate");
require("dotenv/config");
const Schema = mongoose.Schema;

let UserInfoSchema = Schema(
  {
    artistName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    artistImage: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    songName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    songImage: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    song: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    }, 
    created_at: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, require: true }, 
  },

  { versionKey: false, timestamps: true, collection: "songs" }
);

UserInfoSchema.plugin(autopopulate);
var User = mongoose.model("songs", UserInfoSchema);
module.exports = User;
