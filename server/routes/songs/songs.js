// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");

const ObjectId = require("mongodb").ObjectID;
const { body, validationResult } = require("express-validator");
// const ObjectId = require("mongodb").ObjectID;

// router.get("/hi", async (req, res) => {
//   res.status(200).send({
//     signIn: "sucess",
//   });
// });
// router.post(
//   "/",
//   [
//     body("email").isEmail().withMessage("Email must be valid"),
//     body("password")
//       .trim()
//       .notEmpty()
//       .isLength({ min: 5 })
//       .withMessage("please provide a password greater than 6 digits"),
//   ],
//   async (req, res) => {
//     try {
//       let reqBody = req.body;
//       if (req.get("Content-Type") != "application/json") {
//         return res
//           .status(404)
//           .json({ status: 404, message: "Invalid header format" });
//       }
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       if (errors.isEmpty()) {

//       }
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error." });
//     }
//   }
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const Songs = require("../../modules/songs/songs");

// router.get("/", async (req, res) => {
//   res.status(200).send("something went!");
// });

router.post("/", async (req, res) => {
  try {
    var newSong = new Songs();
    const reqBody = req.body;
    console.log("req.body", req.body);
    newSong.artistName = reqBody.artistName;
    newSong.artistImage = reqBody.artistImage;
    newSong.songName = reqBody.songName;
    newSong.songImage = reqBody.songImage;
    newSong.song = reqBody.song;
    newSong.category = reqBody.category;
    newSong
      .save()
      .then(async () => {
        return res
          .status(200)
          .json({ status: 200, message: "add  ", data: newSong });
      })
      .catch((e) => {
        return res
          .status(400)
          .json({ status: 400, message: e, status: "Error" });
      });
  } catch (e) {
    res.status(500).send({
      message: "something went wrong try again",
      error: e,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    var newSong = await Songs.find({});
    res.status(200).json({ status: 200, message: "add  ", data: newSong });
  } catch (e) {
    res.status(500).send({
      message: "something went wrong try again",
      error: e,
    });
  }
});
module.exports = router;
