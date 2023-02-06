const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    imageURL: {
      type: String,
      require: true,
    },

    twitter: {
      type: String,
      require: true,
    },

    instagram: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("artist", artistSchema);
