const mongoose = require("mongoose");
const validator = require("validator");
const autopopulate = require("mongoose-autopopulate");
require("dotenv/config");
const Schema = mongoose.Schema;

let UserInfoSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    favCat: {
      type: Object, 
    }, 
    lastMusicCatId: {
      type: String 
    }, 
  },
  { versionKey: false, timestamps: true, collection: "UserInfo" }
);

UserInfoSchema.plugin(autopopulate);
var User = mongoose.model("UserInfo", UserInfoSchema);
module.exports = User;
