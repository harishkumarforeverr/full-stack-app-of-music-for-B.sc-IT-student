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
    // lastplayedMusicsIds:{
    //   id:{
    //     type: Schema.Types.ObjectId,
    //     require: true,
    //   },
    //   createdAt:{
    //     default:Date.now()
    //   }
    // }
    lastplayedMusicsIds: [
      {
        type: new mongoose.Schema(
          {
            userId:  Schema.Types.ObjectId,
            songId:  Schema.Types.ObjectId
          },
          { timestamps: true }
        )
      }
    ]
  
  },
  { versionKey: false, timestamps: true, collection: "UserInfo" }
);

UserInfoSchema.plugin(autopopulate);
var User = mongoose.model("UserInfo", UserInfoSchema);
module.exports = User;
