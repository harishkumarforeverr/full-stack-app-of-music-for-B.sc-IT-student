const mongoose = require("mongoose");
const validator = require("validator");
const autopopulate = require("mongoose-autopopulate");
require("dotenv/config");
const Schema = mongoose.Schema;

let songsCategorySchema = Schema(
  { 
    label: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    }, 
    value: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    }, 
    
    url: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    }, 
    created_at: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, require: true }, 
  },

  { versionKey: false, timestamps: true, collection: "songsCategory" }
);

songsCategorySchema.plugin(autopopulate);
var User = mongoose.model("songsCategory", songsCategorySchema);
module.exports = User;
