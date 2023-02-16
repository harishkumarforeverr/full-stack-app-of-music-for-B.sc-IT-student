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
const UserInfoSchema = require("../../modules/UserInfo/UserInfo");
const Songs = require("../../modules/songs/songs");
router.get("/", async (req, res) => {
  res.status(200).send("something went!");
});

router.post(
  "/:id",
  [
    body("userId").isEmail().withMessage("userId must be valid"),
    body("favCat").isEmail().withMessage("favCat must be valid"),
  ],
  async (req, res) => {
    const { id } = req.params;
    let reqBody = req.body;
    const findUserIfExist = await UserInfoSchema.findOne({
      userId: ObjectId(id),
    });
    if (findUserIfExist) {
      return res
        .status(400)
        .json({ status: 400, message: "user already exist", data: [] });
    } else {
      var newuser = new UserInfoSchema();
      newuser.userId = id;
      newuser.favCat = reqBody.favCat;
      newuser
        .save()
        .then(async () => {
          return res
            .status(200)
            .json({ status: 200, message: "New user Added", data: newuser });
        })
        .catch((e) => {
          return res
            .status(400)
            .json({ status: 400, message: e, status: "Error" });
        });
    } 
  }
);
router.get("/:id", async (req, res) => { 
  const { id } = req.params;

  const findUserIfExist = await UserInfoSchema.findOne({
    userId: ObjectId(id),
  });
  console.log("findUserIfExist",findUserIfExist)
  if (findUserIfExist.lastMusicCatId) {
    const category = findUserIfExist.lastMusicCatId;
    var newSong = await Songs.find({ category });
    return res
      .status(200)
      .json({ status: 200, message: "add  ", data: newSong });
  } else { 
    const category = findUserIfExist.favCat.category[0].label;

    var newSong = await Songs.find({ category });
    return res
      .status(200)
      .json({ status: 200, message: "add  ", data: newSong });
  }
  // } catch (e) {
  //   res.status(500).send({
  //     message: "something went wrong try again",
  //     error: e,
  //   });
  // }
});
router.put("/:id/:lastMusicCatId", async (req, res) => {
  // try {
  const { id } = req.params;

  const findUserIfExist = await UserInfoSchema.findOneAndUpdate(
    {
      userId: ObjectId(id),
    },
    { lastMusicCatId: req.params.lastMusicCatId },
    { new: true }
  );
  return res.status(200).json({
    status: 200,
    message: "Payment Status Updated",
    data: findUserIfExist,
  });
  // } catch (e) {
  //   res.status(500).send({
  //     message: "something went wrong try again",
  //     error: e,
  //   });
  // }
});

module.exports = router;
