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
  console.log("findUserIfExist", findUserIfExist);
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

router.put("/recentlyPlayed", async (req, res) => {
  const { body } = req;

  const findUserIfExist = await UserInfoSchema.findOne({
    userId: ObjectId(body.userId),
  });
  console.log("findUserIfExist", body);
  // console.log("findUserIfExist",findUserIfExist)
  if (findUserIfExist) {
    const updatedUser = await UserInfoSchema.updateOne(
      { userId: ObjectId(body.userId) },
      { $push: { lastplayedMusicsIds: {songId:ObjectId(body.songId),userId:ObjectId(body.userId) }} }
    );

    return res
      .status(200)
      .json({ status: 200, message: "add  ", data: updatedUser });
  } else {
    return res
      .status(400)
      .json({ status: 400, message: "no user found  ", data: [] });
  }
  // } catch (e) {
  //   res.status(500).send({
  //     message: "something went wrong try again",
  //     error: e,
  //   });
  // }
});
router.get("/recentlyPlayed/:userId", async (req, res) => {
  const { body } = req;

  const findUserIfExist = await UserInfoSchema.findOne({
    userId: ObjectId(req.params.userId),
  });
  console.log("findUserIfExist", body);
  // console.log("findUserIfExist",findUserIfExist)
  if (findUserIfExist) {
    //  const updatedUser= await UserInfoSchema.updateOne(
    //     { userId:  ObjectId(body.userId)},
    //     { $push: { lastplayedMusicsIds: ObjectId(body.songId) } }
    //  )
    const songsdata = await Songs.aggregate([
      {
        $lookup: {
          from: "UserInfo",
          localField: "_id",
          foreignField: "lastplayedMusicsIds.songId",
          as: "songsArr",
        },
      },
      { $match: { $expr: { $ne: ["$songsArr", []] } } },
    
      {
        $unwind: "$songsArr",
      },
      {
        $unwind: "$songsArr.lastplayedMusicsIds",
      },
      
      // {
      //   $project:{
      //     artistName:1,
      //     artistImage:1,
      //     songName:1,
      //     songImage:1,
      //     song:1,
      //     category:1,
      //     created_at:1,
      //     createdBy:1,
      //     // lastplayedTimeStamp:"$songsArr.createdBy"
      //     // lastplayedTimeStamp: {
      //     //   $cond: {
      //     //     if: {
      //     //       $eq: ['$songsArr.lastplayedMusicsIds.songId', "$_id"]
      //     //     },
      //     //     then: "$songsArr",
      //     //     else: null,
      //     //   }
      //     // }
      //   }
      // }, 
      // {
      //   $unwind: "$songsArr.lastplayedMusicsIds",
      // },
    ]);
    // const songsdata = await UserInfoSchema.aggregate([
    //   {
    //     $match:{
    //       userId:ObjectId(req.params.userId)
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "Songs",
    //       localField: "lastplayedMusicsIds.songId",
    //       foreignField: "_id",
    //       as: "songsArr",
    //     },
    //   },
    //   // { $match: { $expr: { $ne: ["$songsArr", []] } } },
    //   {
    //     $project: { lastplayedMusicsIds: 1 },
    //   }, 
    //   {
    //     $unwind:"$lastplayedMusicsIds"
    //   },
    //   {
    //     $sort:{
    //       "lastplayedMusicsIds.createdAt":-1
    //     }
    //   },
    //   {
    //     $project:{
    //       Mid:"$lastplayedMusicsIds.songId",
    //       _id:0
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "Songs",
    //       localField: "Mid",
    //       foreignField: "_id",
    //       as: "songsArr",
    //     },
    //   },
      
    // ]);
    return res
      .status(200)
      .json({ status: 200, message: "add  ", data: songsdata });
  } else {
    return res
      .status(400)
      .json({ status: 400, message: "no user found  ", data: [] });
  }
  // } catch (e) {
  //   res.status(500).send({
  //     message: "something went wrong try again",
  //     error: e,
  //   });
  // }
});

module.exports = router;
