const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    imageURL: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);
